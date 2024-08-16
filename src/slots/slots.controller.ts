import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SlotService } from './slots.service';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';
import { ApiExtraModels, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { Slot } from './schemas/slot.schema';
import { ApiNotSucessResponseHelper, ApiSuccessResponseHelper } from 'src/helpers/swagger.helper';

@ApiTags('Slots')
@ApiExtraModels(Slot)
@Controller('slots')
export class SlotController {
  constructor(private readonly SlotService: SlotService) {}

  @ApiResponse(ApiSuccessResponseHelper(CreateSlotDto.name))
  @ApiResponse(ApiNotSucessResponseHelper())
  @Post()
  async create(@Body() createSlotDto: CreateSlotDto) {
    return this.SlotService.create(createSlotDto);
  }

  @ApiResponse(ApiSuccessResponseHelper(Slot.name, 'array'))
  @ApiResponse(ApiNotSucessResponseHelper())
  @Get()
  findAll() {
    return this.SlotService.findAll();
  }

  @ApiResponse(ApiSuccessResponseHelper(Slot.name))
  @ApiResponse(ApiNotSucessResponseHelper())
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.SlotService.findOne(id);
  }

  @ApiResponse(ApiSuccessResponseHelper(UpdateSlotDto.name))
  @ApiResponse(ApiNotSucessResponseHelper())
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateSlotDto: UpdateSlotDto) {
    return await this.SlotService.update(id, updateSlotDto);
  }

  // @Delete()
  // delete() {
  //   return this.SlotService.deleteall();
  // }

  @ApiResponse(ApiSuccessResponseHelper(Slot.name))
  @ApiResponse(ApiNotSucessResponseHelper())
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.SlotService.delete(id);
  }
  
}
