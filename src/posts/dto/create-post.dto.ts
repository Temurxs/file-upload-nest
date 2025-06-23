import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {

    @IsOptional()
    @ApiProperty({ example: 1, description: 'Unique identifier of the post'})
    id: number;

    @IsString()
    @ApiProperty({ example: 'My First Post', description: 'Title of the post' })
    title: string;

    @IsString()
    @ApiProperty({ example: 'This is the content of the post.', description: 'Content of the post' })
    content: string;

    @IsOptional()
    @ApiProperty({ example: 123, description: 'ID of the author who created the post'})
    authorId: number;

    @IsOptional()
    @ApiProperty({ example: 'https://example.com/image.jpg', description: 'URL of the image associated with the post' })
    image?: string;
}
