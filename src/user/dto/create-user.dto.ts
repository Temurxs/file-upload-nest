import { UploadedFiles } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        description: 'Unique identifier for the user',
        example: 1,
    })
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    id: number;

    @ApiProperty({
        description: 'Name of the user',
        example: 'John Doe',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Username for the user',
        example: 'johndoe123',
    })
    @IsString()
    username: string;

    @ApiProperty({
        description: 'Password for the user',
        example: 'securePassword123',
    })
    @IsString()
    password: string;

    @ApiProperty({
        description: 'Avatar URL for the user (optional)',
        example: 'https://example.com/avatar.jpg',
        required: false,
    })
    @IsOptional()
    avatar: string;
}



