import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SlotService } from './slots.service';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';

@Controller('Slots')
export class SlotController {
  constructor(private readonly SlotService: SlotService) {}

  @Post()
  create(@Body() createSlotDto: CreateSlotDto) {
    return this.SlotService.create(createSlotDto);
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
  update(@Param('id') id: string, @Body() updateSlotDto: UpdateSlotDto) {
    return this.SlotService.update(id, updateSlotDto);
  }
  
}
