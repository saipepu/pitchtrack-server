import { Appearance, StartTimeType } from "../enums/slot.enums";
import { IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Type } from 'class-transformer';
import { IsDuration } from "src/validators/is-duration.validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSlotDto {
    @ApiProperty({ 
        example: "Slot1",
    })
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @ApiProperty({ 
        example: "Speaker1",
    })
    @IsString()    
    @IsNotEmpty()
    readonly speaker: string;

    @ApiProperty({ 
        example: "Note1",
    })
    @IsString()
    @IsNotEmpty()    
    readonly notes: string;

    @ApiProperty({ 
        example: Appearance.COUNTDOWN,
        enum: Appearance
    })
    @IsEnum(Appearance) 
    @IsNotEmpty()   
    readonly appearance: Appearance;

    @ApiProperty({ 
        example: StartTimeType.MANUAL,
        enum: StartTimeType
    })
    @IsEnum(StartTimeType)  
    @IsNotEmpty()  
    readonly startTimeType: StartTimeType;

    @ApiProperty({ 
        example: "2024-08-15T12:40:40.000+07:00",
        format: "yyyy-mm-ddThh:mm:ss.000+07:00"
    })
    @Type(() => Date)
    @IsDate()    
    @IsNotEmpty()
    readonly startTime: Date;

    @ApiProperty({ 
        example: "23:50:00",
        format: "hh:mm:ss"
    })
    @IsDuration()
    @IsNotEmpty()
    readonly duration: string;
}