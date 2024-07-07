import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { IMessage } from './interfaces/message.interface';

@Controller('Messages')
export class MessagesController {
  constructor(private readonly MessageService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.MessageService.create(createMessageDto);
  }

  @Get()
  findAll(): Promise<IMessage[]> {
    return this.MessageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.MessageService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.MessageService.update(id, updateMessageDto);
  }
  
}
