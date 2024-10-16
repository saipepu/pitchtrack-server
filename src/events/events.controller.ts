import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { EventService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { CreateSlotDto } from 'src/slots/dto/create-slot.dto';
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { Event } from './schemas/event.schema';
import { ApiNotSucessResponseHelper, ApiSuccessResponseHelper } from 'src/helpers/swagger.helper';
import { UpdateSlotDto } from 'src/slots/dto/update-slot.dto';
import { UpdateMessageDto } from 'src/messages/dto/update-message.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Public()
@ApiBearerAuth('bearer-token')
@ApiExtraModels(Event)
@ApiTags('Events')
@Controller('events')
export class EventController {
  constructor(private readonly EventService: EventService) {}

  // @ApiResponse(ApiSuccessResponseHelper(CreateEventDto.name))
  // @ApiResponse(ApiNotSucessResponseHelper())
  // @Post()
  // create(@Body() createEventDto: CreateEventDto) {
  //   return this.EventService.create(createEventDto);
  // }

  @ApiResponse(ApiSuccessResponseHelper(Event.name, 'array'))
  @ApiResponse(ApiNotSucessResponseHelper())
  @Get()
  findAll() {
    return this.EventService.findAll();
  }

  @ApiResponse(ApiSuccessResponseHelper(Event.name))
  @ApiResponse(ApiNotSucessResponseHelper())
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.EventService.findOne(id);
  }

  @ApiResponse(ApiSuccessResponseHelper(CreateEventDto.name))
  @ApiResponse(ApiNotSucessResponseHelper())
  @Put(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.EventService.update(id, updateEventDto);
  }

  @ApiResponse(ApiSuccessResponseHelper(CreateEventDto.name))
  @ApiResponse(ApiNotSucessResponseHelper())
  @Post(':id/slots')
  addSlot(@Param('id') id: string, @Body() slot: CreateSlotDto) {
    return this.EventService.addSlot(id, slot);
  }

  @ApiResponse(ApiSuccessResponseHelper(CreateEventDto.name))
  @ApiResponse(ApiNotSucessResponseHelper())
  @Put(':eventId/slots/:slotId')
  updateSlot(
    @Param('eventId') eventId: string,
    @Param('slotId') slotId: string,
    @Body() slot: UpdateSlotDto
  ) {
    return this.EventService.updateSlot(eventId, slotId, slot);
  }

  // UPDATE ALL SLOT
  @ApiResponse(ApiSuccessResponseHelper(CreateEventDto.name))
  @ApiResponse(ApiNotSucessResponseHelper())
  @Put(':eventId/slots')
  updateAllSlot(@Param('eventId') id: string, @Body() slots: UpdateSlotDto[]) {
    return this.EventService.updateAllSlot(id, slots);
  }
  
  // CLONE SLOT
  @ApiResponse(ApiSuccessResponseHelper(CreateEventDto.name))
  @ApiResponse(ApiNotSucessResponseHelper())
  @Post(':id/slots/:slotId/clone')
  cloneSlot(
    @Param('id') eventId: string,
    @Param('slotId') slotId: string
  ): Promise<Event> {
    return this.EventService.cloneSlot(eventId, slotId);
  }

  @Post(':id/reorder-slots')
  @ApiBody({
    description: 'New order of slots by slot titles',
    schema: {
      type: 'object',
      properties: {
        newOrder: {
          type: 'array',
          items: { type: 'string' },
          example: ['slotId1', 'slotId2', 'slotId3'],
        },
      },
    },
  })
  async reorderSlots(
    @Param('id') eventId: string,
    @Body('newOrder') newOrder: string[]
  ): Promise<Event> {
    return this.EventService.reorderSlots(eventId, newOrder);
  }

  @ApiResponse(ApiSuccessResponseHelper(CreateEventDto.name))
  @ApiResponse(ApiNotSucessResponseHelper())
  @Delete(':eventId/slots/:slotId') 
  deleteSlot(
    @Param('eventId') eventId: string, 
    @Param('slotId') slotId: string, 
  ) {
    return this.EventService.deleteSlot(eventId, slotId);
  }

  @ApiResponse(ApiSuccessResponseHelper(CreateEventDto.name))
  @ApiResponse(ApiNotSucessResponseHelper())
  @Post(':id/messages')
  addMessage(@Param('id') id: string, @Body() message: CreateMessageDto) {
    return this.EventService.addMessage(id, message);
  }

  @ApiResponse(ApiSuccessResponseHelper(CreateEventDto.name))
  @ApiResponse(ApiNotSucessResponseHelper())
  @Put(':eventId/messages/:messageId')
  updateMessage(
    @Param('eventId') eventId: string,
    @Param('messageId') messageId: string,
    @Body() message: UpdateMessageDto
  ) {
    return this.EventService.updateMessage(eventId, messageId, message);
  }

  @ApiResponse(ApiSuccessResponseHelper(CreateEventDto.name))
  @ApiResponse(ApiNotSucessResponseHelper())
  @Delete(':eventId/messages/:messageId') 
  deleteMessage(
    @Param('eventId') eventId: string, 
    @Param('messageId') messageId: string, 
  ) {
    return this.EventService.deleteMessage(eventId, messageId);
  }

  @ApiResponse(ApiSuccessResponseHelper(Event.name))
  @ApiResponse(ApiNotSucessResponseHelper())
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.EventService.delete(id);
  }

  @Delete()
  delete() {
    return this.EventService.deleteall();
  }
}
