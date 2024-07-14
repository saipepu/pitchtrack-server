import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SlotService } from './slots.service';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';
import { handleError, handleSuccess } from 'src/helpers/response.helper';

@Controller('Slots')
export class SlotController {
  constructor(private readonly SlotService: SlotService) {}

  @Post()
  async create(@Body() createSlotDto: CreateSlotDto) {
    try {
      return handleSuccess(await this.SlotService.create(createSlotDto));
    } catch (error) {
      return handleError(error);
    }
  }

  @Get()
  findAll() {
    return this.SlotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.SlotService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateSlotDto: UpdateSlotDto) {
    try {
      return handleSuccess(await this.SlotService.update(id, updateSlotDto));
    } catch (error) {
      return handleError(error);
    }
  }

  @Delete()
  delete() {
    return this.SlotService.deleteall();
  }
  
}
