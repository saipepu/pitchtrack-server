
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
import * as cron from 'node-cron';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private EventModel: Model<Event>,
    private socketService: TimerGateway,
  ) {}
  
  private tasks: { [key: string]: cron.ScheduledTask } = {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const createdEvent = new this.EventModel(createEventDto);
    return createdEvent.save();
  }

  async clone(id: string): Promise<Event> {
    const event = await this.EventModel.findById(id).exec();
    if (!event) throw new Error('Event not found');

    const newEvent = new this.EventModel({
      title: event.title + ' (copy)',
      slots: event.slots,
      messages: event.messages,
    });

    return newEvent.save();
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
    const increasedSlotName = event.slots.length > 0 ? Math.max(...event.slots.map(slot => slot.sortOrder)) + 1 : 0;

    const slotWithOrder = { ...slotData, sortOrder: newOrder, title: `Slot ${increasedSlotName + 1}` };

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

    if(slotData.startTimeType === 'scheduled') {
      console.log(slotData.startTime)
      this.socketService.scheduleTask(eventId, slotId, slotData.startTime.toISOString(), slotData.duration, this.socketService.handleStartTimer);
    } else {
      this.removeTask(slotId);
    }

    // EMIT SOCKET EVENT
    this.socketService.acknowledgeRoomInfoUpdate(event, 'slot info');
  
    return event;
  }

  async updateAllSlot(eventId: string, slotsData: UpdateSlotDto[]): Promise<Event> {
    const event = await this.EventModel.findById(eventId).exec();
    if (!event) throw new Error('Event not found');

    await this.EventModel.updateOne({ _id: eventId }, { slots: slotsData }, { new: true });

    const eventWithNewSlotOrder = await this.EventModel.findById(eventId).populate(['slots', 'messages']).exec();

    // EMIT SOCKET EVENT
    this.socketService.acknowledgeRoomInfoUpdate(eventWithNewSlotOrder, 'slot info');

    return eventWithNewSlotOrder;
  }

  async cloneSlot(eventId: string, slotId: string): Promise<Event> {
    const event = await this.EventModel.findById(eventId).exec();
    if (!event) throw new Error('Event not found');

    const slot: any = event.slots.find(slot => slot._id.toString() === slotId);
    if (!slot) throw new Error('Slot not found');

    const newSlot = { ...slot.toObject(), _id: undefined, sortOrder: slot.sortOrder + 1 };
    // increment the sortOrder of all slots after the cloned slot
    event.slots.forEach(slot => {
      if (slot.sortOrder >= newSlot.sortOrder) {
        slot.sortOrder += 1;
      }
    });

    event.save()

    const eventWithNewSlot = await this.EventModel.findByIdAndUpdate(
      eventId,
      { $push: { slots: newSlot }},
      { new: true }
    ).populate(['slots', 'messages']).exec();

    // EMIT SOCKET EVENT
    this.socketService.acknowledgeRoomInfoUpdate(eventWithNewSlot, 'Syncing new slot');

    return eventWithNewSlot;
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
  
    let updatedEvent = await this.EventModel.findById(eventId).populate(['slots', 'messages']).exec();
    
    // RESET THE FIRST SLOT START TIME TYPE TO BE MANUAL
    // CUZ IF THE REORDERED SLOT IS A LINKED START TIME TYPE, IT WILL HAVE NO ONE TO LINKED TO
    if (updatedEvent.slots.length > 0) {
      await this.EventModel.updateOne(
        { _id: eventId, 'slots.sortOrder': 0 },
        { $set: { 'slots.$.startTimeType': 'manual' } },
        { new: true }
      );
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

  // --------------------- //// ---- DANGER ZONE ---- //// --------------------- //
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

  removeTask(id: string) {
    const task = this.tasks[id];
    if (task) {
      task.stop();
      delete this.tasks[id]; // Remove from the task list
      console.log(`Task [${id}] removed`);
    } else {
      console.log(`No task found with ID [${id}]`);
    }
  }

  async delete(id: string): Promise<Event> {
    return this.EventModel.findByIdAndDelete(id).exec();
  }

  async deleteall() {
    return this.EventModel.deleteMany().exec();
  }
}
