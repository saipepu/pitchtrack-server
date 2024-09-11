import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Organizer } from "./schema/organizer.schema";
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { OrganizerService } from "./organizer.service";
import { CreateOrganzierDto } from "./dto/create-organizer.dto";
import { ApiNotSucessResponseHelper, ApiSuccessResponseHelper } from "src/helpers/swagger.helper";
import { UpdateOrgainzerDto } from "./dto/update-organizer.dto";

@ApiBearerAuth('bearer-token')
@ApiTags('Organizer')
@ApiExtraModels(Organizer)
@Controller('orgs')
export class OrganizerController {
  constructor(private readonly organizerService: OrganizerService) {}

  @ApiResponse(ApiSuccessResponseHelper(Organizer.name, 'array'))
  @ApiResponse(ApiNotSucessResponseHelper())
  @Get()
  async findAll() {
    return this.organizerService.findAll();
  }

  @ApiResponse(ApiSuccessResponseHelper(Organizer.name))
  @ApiResponse(ApiNotSucessResponseHelper())
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.organizerService.findById(id);
  }

  @ApiResponse(ApiSuccessResponseHelper(CreateOrganzierDto.name))
  @ApiResponse(ApiNotSucessResponseHelper())
  @Post()
  async createOrganizer(@Body() createOrganzierDto: CreateOrganzierDto) {
    return this.organizerService.create(createOrganzierDto);
  }

  @ApiResponse(ApiSuccessResponseHelper(UpdateOrgainzerDto.name))
  @ApiResponse(ApiNotSucessResponseHelper())
  @Put(':id')
  async updateOrganizer(@Param('id') id: string, @Body() updateOrgainzerDto: UpdateOrgainzerDto) {
    return this.organizerService.updateOrganizer(id, updateOrgainzerDto);
  }

  @ApiResponse(ApiSuccessResponseHelper(Organizer.name))
  @ApiResponse(ApiNotSucessResponseHelper())
  @Delete(':id')
  async deleteOrganizer(@Param('id') id: string) {
    return this.organizerService.deleteOrganizer(id);
  }

  @Delete()
  async deleteAll() {
    return this.organizerService.deleteAll();
  }

  @ApiResponse(ApiSuccessResponseHelper(Organizer.name))
  @ApiResponse(ApiNotSucessResponseHelper())
  @ApiOperation({ summary: 'Create an event as the organizer' })
  @Post(':id/event')
  async createEvent(@Param('id') id: string, @Body() payload: any) {
    return this.organizerService.createEvent(id, payload);
  }

}