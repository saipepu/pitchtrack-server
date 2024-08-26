import { getSchemaPath } from '@nestjs/swagger';


export function ApiSuccessResponseHelper(schema: string, array?: 'array') {
    if (array) {
        return {
            status: 200, schema: {
            properties: {
            success: { type: 'boolean', example: true},
            message: { type: 'array', items: {$ref: getSchemaPath(schema)} }
            },
        }}
    }

    return { 
        status: 200, 
        schema: {
            properties: {
            success: { type: 'boolean', example: true},
            message: { type: 'string', $ref: getSchemaPath(schema)}
        },
    }}
}


export function ApiNotSucessResponseHelper() {
    return { 
        status: 400, schema: {
        properties: {
            success: { type: 'boolean', example: false},
            message: { type: 'string', example: 'Bad Request'}
        },
    }}
}