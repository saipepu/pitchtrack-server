import { MessageWeight, MessageColor } from "../enums/message.enums";
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMessageDto {
    @ApiProperty({ 
        example: "Message1",
    })
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({ 
        example: true,
    })
    @IsBoolean()    
    @IsNotEmpty()
    readonly isCap: boolean;

    @ApiProperty({ 
        example: MessageWeight.BOLD,
        enum: MessageWeight
    })
    @IsEnum(MessageWeight) 
    @IsNotEmpty()   
    readonly weight: MessageWeight;

    @ApiProperty({ 
        example: MessageColor.GREEN,
        enum: MessageColor
    })
    @IsEnum(MessageColor)
    @IsNotEmpty()  
    readonly color: MessageColor;
}