import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { EventService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { CreateSlotDto } from 'src/slots/dto/create-slot.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Events')
@Controller('events')
export class EventController {
  constructor(private readonly EventService: EventService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.EventService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.EventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.EventService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.EventService.update(id, updateEventDto);
  }

  @Post(':id/slots')
  addSlot(@Param('id') id: string, @Body() slot: CreateSlotDto) {
    return this.EventService.addSlot(id, slot);
  }

  // @Delete(':id')
  // delete(@Param('id') id: string) {
  //   return this.EventService.delete(id);
  // }

  @Delete()
  delete() {
    return this.EventService.deleteall();
  }
  
}
