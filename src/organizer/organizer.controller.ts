import { ApiExtraModels, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Organizer } from "./schema/organizer.schema";
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { OrganizerService } from "./organizer.service";
import { Query as ExpressQuery } from 'express-serve-static-core'
import { createOrganzierDto } from "./dto/createOrganizer.dto";
import { resGetAllOrganizerDto, resGetOrganizerByIdDto } from "./dto/response.dto";

@ApiTags('Organizer')
@ApiExtraModels(Organizer, createOrganzierDto)
@Controller('')
export class OrganizerController {
  constructor(
    private readonly organizerService: OrganizerService
  ) {}

  // Get All Organizers
  @Get('orgs')
  @ApiOperation({ summary: 'Get All Organizers' })
  @ApiResponse({ status: 200, description: 'Get All Organizers', schema: resGetAllOrganizerDto })
  async findAll(
    @Query()
    query: ExpressQuery
  ) {
    return this.organizerService.findAll({ query });
  }

  // Get Organizer By Id
  @Get('orgs/:id')
  @ApiOperation({ summary: 'Get Organizer By Id' })
  @ApiResponse({ status: 200, description: 'Get Organizer By Id', schema: resGetOrganizerByIdDto })
  async findById(
    @Param('id')
    orgId: string
  ) {
    return this.organizerService.findById(orgId);
  }

  // Create Organizer
  @Post('orgs')
  @ApiOperation({ summary: 'Create Organizer' })
  @ApiResponse({ status: 200, description: 'Create Organizer' })
  async createOrganizer(
    @Body()
    organizer: createOrganzierDto
  ) {
    return this.organizerService.createOrganizer(organizer);
  }

  // Update Organizer
  @Put('orgs/:id')
  @ApiOperation({ summary: 'Update Organizer' })
  @ApiResponse({ status: 200, description: 'Update Organizer' })
  async updateOrganizer(
    @Param('id')
    orgId: string,
    @Body()
    organizer: createOrganzierDto
  ) {
    return this.organizerService.updateOrganizer(orgId, organizer);
  }

  // Delete Organizer
  @Delete('orgs/:id')
  @ApiOperation({ summary: 'Delete Organizer' })
  @ApiResponse({ status: 200, description: 'Delete Organizer' })
  async deleteOrganizer(
    @Param('id')
    orgId: string
  ) {
    return this.organizerService.deleteOrganizer(orgId);
  }

}