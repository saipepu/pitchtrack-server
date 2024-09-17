// import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
// import { MessagesService } from './messages.service';
// import { CreateMessageDto } from './dto/create-message.dto';
// import { UpdateMessageDto } from './dto/update-message.dto';
// import { ApiExcludeController, ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { Message } from './schemas/message.schema';
// import { ApiNotSucessResponseHelper, ApiSuccessResponseHelper } from 'src/helpers/swagger.helper';

// @ApiTags('Messages')
// @ApiExtraModels(Message)
// @Controller('messages')
// @ApiExcludeController()
// export class MessagesController {
//   constructor(private readonly MessageService: MessagesService) {}

//   @ApiResponse(ApiSuccessResponseHelper(CreateMessageDto.name))
//   @ApiResponse(ApiNotSucessResponseHelper())
//   @Post()
//   create(@Body() createMessageDto: CreateMessageDto) {
//     return this.MessageService.create(createMessageDto);
//   }

//   @ApiResponse(ApiSuccessResponseHelper(Message.name, 'array'))
//   @ApiResponse(ApiNotSucessResponseHelper())
//   @Get()
//   findAll() {
//     return this.MessageService.findAll();
//   }

//   @ApiResponse(ApiSuccessResponseHelper(Message.name))
//   @ApiResponse(ApiNotSucessResponseHelper())
//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.MessageService.findOne(id);
//   }

//   @ApiResponse(ApiSuccessResponseHelper(UpdateMessageDto.name))
//   @ApiResponse(ApiNotSucessResponseHelper())
//   @Put(':id')
//   async update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
//     return this.MessageService.update(id, updateMessageDto);
//   }
  
//   @ApiResponse(ApiSuccessResponseHelper(Message.name))
//   @ApiResponse(ApiNotSucessResponseHelper())
//   @Delete(':id')
//   deleteOne(@Param('id') id: string) {
//     return this.MessageService.delete(id);
//   }

//   // @Delete()
//   // delete() {
//   //   return this.MessageService.deleteall();
//   // }
// }
