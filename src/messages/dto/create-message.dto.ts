import { MessageWeight, MessageColor } from "../enums/message.enums";
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMessageDto {
    @ApiProperty({ example: "Tag1"})
    @IsString()
    @IsNotEmpty()
    readonly tag: string;

    @ApiProperty({ example: "Message1"})
    @IsString()
    @IsNotEmpty()
    readonly desc: string;

    @ApiProperty({ example: true })
    @IsBoolean()    
    @IsNotEmpty()
    readonly isCap: boolean;

    @ApiProperty({ example: true })
    @IsBoolean()    
    @IsNotEmpty()
    readonly onDisplay: boolean;

    @ApiProperty({ 
        example: MessageColor.GREEN,
        enum: MessageColor
    })
    @IsEnum(MessageColor)
    @IsNotEmpty()  
    readonly color: MessageColor;
}