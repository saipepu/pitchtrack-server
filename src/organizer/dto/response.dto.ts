import { getSchemaPath } from "@nestjs/swagger";
import { Organizer } from "../schema/organizer.schema";

export const resGetAllOrganizerDto = {
  type: 'object',
  properties: {
    success: { type: 'boolean' },
    message: {
      type: 'array',
      items: {
        $ref: getSchemaPath(Organizer)
      }
    }
  }
}

export const resGetOrganizerByIdDto = {
  type: 'object',
  properties: {
    success: { type: 'boolean' },
    message: {
      type: 'string',
      $ref: getSchemaPath(Organizer)
    }
  }
}