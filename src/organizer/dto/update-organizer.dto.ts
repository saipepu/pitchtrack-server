import { PartialType } from "@nestjs/swagger";
import { CreateOrganzierDto } from "./create-organizer.dto";


export class UpdateOrgainzerDto extends PartialType(CreateOrganzierDto) {}