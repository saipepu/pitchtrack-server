import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Organizer } from "./schema/organizer.schema";
import { Model } from "mongoose";
import { CreateOrganzierDto } from "./dto/create-organizer.dto";
import { UpdateOrgainzerDto } from "./dto/update-organizer.dto";
import { EventService } from "src/events/events.service";
import { Appearance, StartTimeType } from "src/slots/enums/slot.enums";
import { MessageColor } from "src/messages/enums/message.enums";

@Injectable()
export class OrganizerService {
  constructor(
    @InjectModel(Organizer.name) private OrganizerModel: Model<Organizer>,
    private eventService: EventService
  ) {}

  private testSlots: any[] = [
    {
      "tag": "timeslot",
      "title": "Slot 1",
      "speaker": "All Teams",
      "notes": "Senior Projects I & II Exhibition",
      "appearance": Appearance.COUNTDOWN,
      "startTimeType": StartTimeType.MANUAL,
      "startTime": new Date(),
      "duration": "20",
      "pauseTime": "0",
      "warningTime": "10",
      "dangerTime": "5",
      "warningColor": "yellow",
      "dangerColor": "red",
      "dangerSound": "danger",
      "warningSound": "warning",
      "flash": true,
      "flashCount": 3,
      "sortOrder": 0,
      "status": "active",
      "active": false
    },
    {
      "tag": "timeslot",
      "title": "Slot 2",
      "speaker": "All Teams",
      "notes": "Senior Projects I & II Exhibition",
      "appearance": Appearance.COUNTDOWN,
      "startTimeType": StartTimeType.LINKED,
      "startTime": new Date(),
      "duration": "5",
      "pauseTime": "0",
      "warningTime": "3",
      "dangerTime": "2",
      "warningColor": "yellow",
      "dangerColor": "red",
      "dangerSound": "danger",
      "warningSound": "warning",
      "flash": true,
      "flashCount": 3,
      "sortOrder": 1,
      "status": "active",
      "active": false
    },
    {
      "tag": "timeslot",
      "title": "Slot 3",
      "speaker": "All Teams",
      "notes": "Senior Projects I & II Exhibition",
      "appearance": Appearance.COUNTDOWN,
      "startTimeType": StartTimeType.LINKED,
      "startTime": new Date(),
      "duration": "300",
      "pauseTime": "0",
      "warningTime": "100",
      "dangerTime": "50",
      "warningColor": "yellow",
      "dangerColor": "red",
      "dangerSound": "danger",
      "warningSound": "warning",
      "flash": true,
      "flashCount": 3,
      "sortOrder": 2,
      "status": "active",
      "active": false
    },
  ];
  private storyBasedSlots: any[] = [
    {
      "tag": "timeslot",
      "title": "The Heroes Assemble",
      "speaker": "Goku, Naruto, Luffy",
      "notes": "The most powerful heroes are summoned to defend the multiverse!",
      "appearance": Appearance.COUNTDOWN,
      "startTimeType": StartTimeType.LINKED,
      "startTime": new Date(),
      "duration": "4",
      "warningTime": "2",
      "dangerTime": "1",
      "warningColor": "yellow",
      "dangerColor": "red",
      "dangerSound": "danger",
      "warningSound": "warning",
      "flash": true,
      "flashCount": 3,
      "sortOrder": 0,
      "status": "active",
      "active": false
    },
    {
      "tag": "timeslot",
      "title": "Villains Strike",
      "speaker": "Frieza, Orochimaru, Shigaraki",
      "notes": "The villains are plotting to overthrow the heroes!",
      "appearance": Appearance.COUNTDOWN,
      "startTimeType": StartTimeType.LINKED,
      "startTime": new Date(),
      "duration": "5",
      "warningTime": "2",
      "dangerTime": "1",
      "warningColor": "yellow",
      "dangerColor": "red",
      "dangerSound": "danger",
      "warningSound": "warning",
      "flash": true,
      "flashCount": 3,
      "sortOrder": 1,
      "status": "active",
      "active": false
    },
    {
      "tag": "timeslot",
      "title": "The Epic Battle Begins",
      "speaker": "Deku, Tanjiro, Sailor Moon",
      "notes": "A fierce battle erupts! The heroes unite to fight back.",
      "appearance": Appearance.COUNTDOWN,
      "startTimeType": StartTimeType.LINKED,
      "startTime": new Date(),
      "duration": "6",
      "warningTime": "3",
      "dangerTime": "1",
      "warningColor": "yellow",
      "dangerColor": "red",
      "dangerSound": "danger",
      "warningSound": "warning",
      "flash": true,
      "flashCount": 3,
      "sortOrder": 2,
      "status": "active",
      "active": false
    },
    {
      "tag": "timeslot",
      "title": "Unexpected Allies",
      "speaker": "Vegeta, Sasuke, Zoro",
      "notes": "Powerful characters once seen as rivals or lone wolves join the fight to assist the heroes.",
      "appearance": Appearance.COUNTDOWN,
      "startTimeType": StartTimeType.LINKED,
      "startTime": new Date(),
      "duration": "7",
      "warningTime": "3",
      "dangerTime": "2",
      "warningColor": "yellow",
      "dangerColor": "red",
      "dangerSound": "danger",
      "warningSound": "warning",
      "flash": true,
      "flashCount": 3,
      "sortOrder": 3,
      "status": "active",
      "active": false
    },
    {
      "tag": "timeslot",
      "title": "Final Strike",
      "speaker": "Goku & Naruto",
      "notes": "The ultimate Kamehameha and Rasengan combo to save the universe.",
      "appearance": Appearance.COUNTDOWN,
      "startTimeType": StartTimeType.LINKED,
      "startTime": new Date(),
      "duration": "8",
      "warningTime": "3",
      "dangerTime": "2",
      "warningColor": "yellow",
      "dangerColor": "red",
      "dangerSound": "danger",
      "warningSound": "warning",
      "flash": true,
      "flashCount": 3,
      "sortOrder": 4,
      "status": "active",
      "active": false
    },
    {
      "tag": "timeslot",
      "title": "Victory Celebration",
      "speaker": "Luffy, Tanjiro, Deku",
      "notes": "The heroes celebrate their victory while recovering from the intense battle.",
      "appearance": Appearance.COUNTDOWN,
      "startTimeType": StartTimeType.LINKED,
      "startTime": new Date(),
      "duration": "5",
      "warningTime": "2",
      "dangerTime": "1",
      "warningColor": "yellow",
      "dangerColor": "red",
      "dangerSound": "danger",
      "warningSound": "warning",
      "flash": true,
      "flashCount": 3,
      "sortOrder": 5,
      "status": "active",
      "active": false
    }
  ]
  private examRoomSlots: any[] = [
    {
      "tag": "timeslot",
      "title": "Preparing",
      "speaker": "Instructor",
      "notes": "Students should be gathering around the exam around.",
      "appearance": Appearance.COUNTDOWN,
      "startTimeType": StartTimeType.LINKED,
      "startTime": new Date(),
      "duration": "10",
      "warningTime": "5",
      "dangerTime": "2",
      "warningColor": "yellow",
      "dangerColor": "red",
      "dangerSound": "danger",
      "warningSound": "warning",
      "flash": true,
      "flashCount": 3,
      "sortOrder": 0,
      "status": "active",
      "active": false
    },
    {
      "tag": "timeslot",
      "title": "Exam Start",
      "speaker": "Proctor",
      "notes": "Leave all bags and electronic devices at the front of the room.",
      "appearance": Appearance.COUNTDOWN,
      "startTimeType": StartTimeType.LINKED,
      "startTime": new Date(),
      "duration": "900",
      "warningTime": "300",
      "dangerTime": "180",
      "warningColor": "yellow",
      "dangerColor": "red",
      "dangerSound": "danger",
      "warningSound": "warning",
      "flash": true,
      "flashCount": 3,
      "sortOrder": 1,
      "status": "active",
      "active": false
    },
    {
      "tag": "timeslot",
      "title": "No more latecomers",
      "speaker": "All Students",
      "notes": "Students will have a 10-minute break before continuing to the next section.",
      "appearance": Appearance.COUNTDOWN,
      "startTimeType": StartTimeType.LINKED,
      "startTime": new Date(),
      "duration": "6300",
      "warningTime": "2100",
      "dangerTime": "1200",
      "warningColor": "yellow",
      "dangerColor": "red",
      "dangerSound": "danger",
      "warningSound": "warning",
      "flash": true,
      "flashCount": 3,
      "sortOrder": 2,
      "status": "active",
      "active": false
    }
  ]
  private examRoomMessages: any[] = [
    {
      tag: 'message',
      desc: 'Exam starting soon',
      color: MessageColor.BLACK,
      isCap: true,
      onDisplay: false,
    },
    {
      tag: 'message',
      desc: 'Leave bags and devices at the font',
      color: MessageColor.BLACK,
      isCap: true,
      onDisplay: false,
    },
    {
      tag: 'message',
      desc: 'Delay time overdue. No more latecomers',
      color: MessageColor.BLACK,
      isCap: true,
      onDisplay: false,
    },
  ]
      

  async create(createOrganzierDto: CreateOrganzierDto) {
    const createdOrganizer = new this.OrganizerModel(createOrganzierDto);

    const event: any = await this.eventService.create({
      title: 'Test Event',
      slots: this.testSlots,
      messages: []
    })
    const event2: any = await this.eventService.create({
      title: 'Dwag Fight',
      slots: this.storyBasedSlots,
      messages: []
    })
    const event3: any = await this.eventService.create({
      title: 'Exam Room',
      slots: this.examRoomSlots,
      messages: this.examRoomMessages
    })

    createdOrganizer.events.push(event._id, event2._id, event3._id);

    return createdOrganizer.save();
  }

  async findAll() {
    const organizers = await this.OrganizerModel.find().populate('events').exec();
    return organizers;
  }

  async findById(id: string) {
    return await this.OrganizerModel.findById(id).populate('events').exec();
  }

  async findByEmail(email: string) {
    return await this.OrganizerModel.findOne({ email: email }).exec();
  }

  async updateOrganizer(id: string, updateOrgainzerDto: UpdateOrgainzerDto) {
    console.log(updateOrgainzerDto)
    await this.OrganizerModel.findByIdAndUpdate(id, updateOrgainzerDto, {new: true}).exec();
    return await this.OrganizerModel.findById(id).populate('events').exec();
  }

  async deleteOrganizer(id: string) {
    return await this.OrganizerModel.findByIdAndDelete(id).exec();
  }

  async deleteAll() {
    return this.OrganizerModel.deleteMany().exec();
  }

  async createEvent(id: string, payload: any) {
    const organizer = await this.OrganizerModel.findById(id).exec();
    const event: any = await this.eventService.create({
      title: payload.title,
      slots: this.testSlots,
      messages: []
    })

    organizer.events.push(event._id);
    return organizer.save();
  }

  async cloneEvent(id: string, eventId: string) {
    const organizer = await this.OrganizerModel.findById(id).exec();
    const event: any = await this.eventService.clone(eventId);

    organizer.events.push(event._id);
    return organizer.save();
  }

  async deleteEvent(id: string, eventId: string) {
    const organizer = await this.OrganizerModel.findById(id).exec();
    organizer.events = organizer.events.filter((event: any) => event.toString() !== eventId);
    await this.eventService.delete(eventId);
    return organizer.save();
  }

}