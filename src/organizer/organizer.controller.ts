import { ApiExtraModels, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Organizer } from "./organizer.schema";
import { Controller, Get, Query } from "@nestjs/common";
import { OrganizerService } from "./organizer.service";
import { Query as ExpressQuery } from 'express-serve-static-core'

@ApiTags('Organizer')
@ApiExtraModels(Organizer)
@Controller('')
export class OrganizerController {
  constructor(
    private readonly organizerService: OrganizerService
  ) {}

  // Get All Organizers
  @Get('orgs')
  @ApiOperation({ summary: 'Get All Organizers' })
  @ApiResponse({ status: 200, description: 'Get All Organizers' })
  async findAll(
    @Query()
    query: ExpressQuery
  ) {
    return this.organizerService.findAll({ query });
  }

}