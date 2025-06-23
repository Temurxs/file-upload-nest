import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Put, BadRequestException, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../guard/auth.guard';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiConsumes('multipart/form-data')
  @ApiProperty({type:"string", format:"binary"})
  @ApiBody({
    description: 'Avatar photo',
    type: CreateUserDto,
    examples: {
      example1: {
        value: {
          name: 'Jane Doe',
          username: 'jane_doe',
          password: 'newpassword123',
          id: 1,
          avatar: 'file',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 400, description: 'Validation failed or bad request.' })
  @UseInterceptors(FileInterceptor('avatar'))
  @Post()
  async createUser(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateUserDto,
  ) {
    try {
      const dtoWithFile = {
        ...body,
        avatar: file?.path || '',
      };

      const createUserDto = plainToInstance(CreateUserDto, dtoWithFile);
      await validateOrReject(createUserDto);

      return this.userService.create(createUserDto, file);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @ApiResponse({ status: 200, description: 'List of all users.' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiResponse({ status: 200, description: 'User found.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update user with avatar photo',
    type: UpdateUserDto,
    examples: {
      example1: {
        value: {
          name: 'Jane Doe',
          username: 'jane_doe',
          password: 'newpassword123',
          id: 1,
          avatar: 'file',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'User successfully updated.' })
  @ApiResponse({ status: 400, description: 'Validation failed or bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UseInterceptors(FileInterceptor('avatar', { dest: './uploads' }))
  @Put()
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateUserDto,
    @Req() req: any,
  ) {
    try {
      const userId = req.user.sub;
      const data = {
        ...body,
        avatar: file?.path || undefined,
      };

      const dto = plainToInstance(UpdateUserDto, data);
      await validateOrReject(dto);

      const updated = this.userService.update(dto, file, userId);
      return {
        user: updated,
        file,
        userId,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @ApiResponse({ status: 200, description: 'User successfully deleted.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Req() req: any) {
    const userId = req.user.sub;
    return this.userService.remove(userId);
  }
}
