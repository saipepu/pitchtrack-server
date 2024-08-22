import { Appearance, StartTimeType } from "../enums/slot.enums";
import { IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Type } from 'class-transformer';
import { IsDuration } from "src/validators/is-duration.validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSlotDto {
    @ApiProperty({ 
        example: "Tag1",
    })
    @IsString()
    @IsNotEmpty()
    readonly tag: string;

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

    @ApiProperty({ example: "3500"})
    @IsNotEmpty()
    readonly duration: string;

    @ApiProperty({ example: "3500"})
    @IsNotEmpty()
    readonly pauseTime: string;

    @ApiProperty({ example: "35"})
    @IsNotEmpty()
    readonly warningTime: string;

    @ApiProperty({ example: "5"})
    @IsNotEmpty()
    readonly dangerTime: string;

    @ApiProperty({ example: "yellow"})
    @IsNotEmpty()
    readonly warningColor: string;

    @ApiProperty({ example: "red"})
    @IsNotEmpty()
    readonly dangerColor: string;

    @ApiProperty({ example: "danger"})
    @IsNotEmpty()
    readonly dangerSound: string;

    @ApiProperty({ example: "warning"})
    @IsNotEmpty()
    readonly warningSound: string;


    @ApiProperty({ example: true})
    @IsNotEmpty()
    readonly flash: boolean;

    @ApiProperty({ example: 3})
    @IsNotEmpty()
    readonly flashCount: number;

    @ApiProperty({ example: 1})
    @IsNotEmpty()
    readonly sortOrder: number;

    @ApiProperty({ example: "active"})
    @IsNotEmpty()
    readonly status: string;

    @ApiProperty({ example: false})
    @IsNotEmpty()
    readonly active: boolean;
}