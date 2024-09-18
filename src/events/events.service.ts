
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './schemas/event.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { CreateSlotDto } from 'src/slots/dto/create-slot.dto';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { UpdateSlotDto } from 'src/slots/dto/update-slot.dto';
import { UpdateMessageDto } from 'src/messages/dto/update-message.dto';
import { TimerGateway } from 'src/timer/timers.gateway';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private EventModel: Model<Event>,
    private socketService: TimerGateway,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const createdEvent = new this.EventModel(createEventDto);
    return createdEvent.save();
  }

  async findAll(): Promise<Event[]> {
    return this.EventModel.find().populate(['slots', 'messages']).exec();
  }

  async findOne(id: string): Promise<Event> {
    return await this.EventModel.findById(id).populate(['slots', 'messages']).exec();
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    return this.EventModel.findByIdAndUpdate(id, updateEventDto, { new: true }).exec();
  }

  async addSlot(id: string, slotData: CreateSlotDto): Promise<Event> {
    const event = await this.EventModel.findById(id).populate('slots').exec();

    const newOrder = event.slots.length > 0 ? Math.max(...event.slots.map(slot => slot.sortOrder)) + 1 : 0;

    const slotWithOrder = { ...slotData, sortOrder: newOrder };

    const eventWithNewSlot = await this.EventModel.findByIdAndUpdate(
      id,
      { $push: { slots: slotWithOrder }},
      { new: true }
    ).populate(['slots', 'messages']).exec();

    // EMIT SOCKET EVENT
    console.log('added slot')
    this.socketService.acknowledgeRoomInfoUpdate(eventWithNewSlot, 'Syncing new slot');

    return eventWithNewSlot;
  }

  async updateSlot(eventId: string, slotId: string, slotData: UpdateSlotDto): Promise<Event> {

    // CREATING A NEW OBJECT WITH THE FIELDS TO UPDATE
    const updateFields = {};
    Object.keys(slotData).forEach(key => {
      updateFields[`slots.$.${key}`] = slotData[key];
    });

    const event = await this.EventModel.findOneAndUpdate(
      { _id: eventId, 'slots._id': slotId },
      {
        $set: updateFields
      },
      { new: true }
    )
      .populate(['slots', 'messages'])
      .exec();

    // EMIT SOCKET EVENT
    this.socketService.acknowledgeRoomInfoUpdate(event, 'slot info');
  
    return event;
  }

  async reorderSlots(eventId: string, newOrder: string[]): Promise<Event> {
    const event = await this.EventModel.findById(eventId).exec();
    if (!event) throw new Error('Event not found');
  
    const slotsMap = new Map(event.slots.map(slot => [slot._id.toString(), slot]));
  
    const bulkOperations = newOrder.reduce((ops, slotName, index) => {
      console.log(slotName)
      const slot = slotsMap.get(slotName);
      if (slot && slot.sortOrder !== index) { 
        ops.push({
          updateOne: {
            filter: { _id: eventId, 'slots._id': slotName },
            update: { 'slots.$.sortOrder': index }, 
          },
        });
      }
      return ops;
    }, []);
  
    if (bulkOperations.length > 0) {
      await this.EventModel.bulkWrite(bulkOperations);
    }
  
    const eventWithNewSlotOrder = await this.EventModel.findById(eventId).populate(['slots', 'messages']).exec();

    // EMIT SOCKET EVENT
    this.socketService.acknowledgeRoomInfoUpdate(eventWithNewSlotOrder, 'slot order');

    return eventWithNewSlotOrder;
  }

  async deleteSlot(eventId: string, slotId: string): Promise<Event> {
    const event = await this.EventModel.findOneAndUpdate(
      { _id: eventId },
      { $pull: { slots: { _id: slotId } } },
      { new: true }
    )
      .populate(['slots', 'messages'])
      .exec();

    // EMIT SOCKET EVENT
    this.socketService.acknowledgeRoomInfoUpdate(event, 'slot deletion');
  
    return event;
  }

  async addMessage(id: string, messageData: CreateMessageDto): Promise<Event> {
    const event = await this.EventModel.findByIdAndUpdate(
      id,
      { $push: { messages: messageData }},
      { new: true }
    ).populate(['slots', 'messages']).exec();

    // EMIT SOCKET EVENT
    this.socketService.acknowledgeRoomInfoUpdate(event, 'new message');

    return event;
  }

  async updateMessage(eventId: string, messageId: string, messageData: UpdateMessageDto): Promise<Event> {

    console.log(messageData.onDisplay)

    // CREATING A NEW OBJECT WITH THE FIELDS TO UPDATE
    const updateFields = {};
    Object.keys(messageData).forEach(key => {
      updateFields[`messages.$.${key}`] = messageData[key];
    });

    // SET ALL MESSAGE ONDISPLAY TO FALSE
    await this.EventModel.updateMany(
      { },
      { $set: { "messages.$[].onDisplay": false } },
      { new: true }
    )

    const event = await this.EventModel.findOneAndUpdate(
      { _id: eventId, 'messages._id': messageId },
      {
        $set: updateFields
      },
      { new: true }
    )
      .populate(['slots', 'messages'])
      .exec();

    // EMIT SOCKET EVENT
    this.socketService.acknowledgeRoomInfoUpdate(event, 'message info');
  
    return event;
  }

  async deleteMessage(eventId: string, messageId: string): Promise<Event> {
    const event = await this.EventModel.findOneAndUpdate(
      { _id: eventId },
      { $pull: { messages: { _id: messageId } } },
      { new: true }
    )
      .populate(['slots', 'messages'])
      .exec();

    // EMIT SOCKET EVENT
    this.socketService.acknowledgeRoomInfoUpdate(event, 'message deletion');
  
    return event;
  }

  // --------------------- //// ---- DANGER ZONE ---- //// --------------------- //

  async delete(id: string): Promise<Event> {
    return this.EventModel.findByIdAndDelete(id).exec();
  }

  async deleteall() {
    return this.EventModel.deleteMany().exec();
  }
}
