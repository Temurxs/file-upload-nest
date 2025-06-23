import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { request, Request } from 'express';
import * as jwt from 'jsonwebtoken';

let database: CreateUserDto[] = [
{ id: 1, name: 'John Doe', username: 'johndoe', password: 'password123', avatar: 'https://example.com/avatar1.png' },
{ id: 2, name: 'Jane Smith', username: 'janesmith', password: 'password456', avatar: 'https://example.com/avatar2.png' },
{ id: 3, name: 'Alice Johnson', username: 'alicej', password: 'password789', avatar: 'https://example.com/avatar3.png' },
{ id: 4, name: 'Bob Brown', username: 'bobbrown', password: 'password101', avatar: 'https://example.com/avatar4.png' },
{ id: 8, name: 'Charlie White', username: 'charliew', password: 'password202', avatar: 'https://example.com/avatar5.png' }
]

console.log(database);


@Injectable()
export class UserService {
 create(createUserDto: CreateUserDto, file: Express.Multer.File) {
  
    const user = { ...createUserDto, avatar: file.originalname }; 
    database.push(user);
    
    const token = jwt.sign(
      { sub: user.id, username: user.username }, 
      'your_jwt_secret',
      { expiresIn: '1h' }
    )
    return {
      ...user,
     avatar: file.path,
     token
    };
  }

  findAll() {
    return database;
  }

  findOne(id: number) {
    const user = database.find(user => user.id === id);
    if (!user) {
      return { message: `User with id ${id} not found` };
    }
    return user;
  }

  update(updateUserDto: UpdateUserDto, file: Express.Multer.File, userId : number) {
    const user= database.find(user => user.id === userId);
    console.log(userId, user);
    
    if (!user) {
      return { message: `User with id  not found` };
    }

  
    const updatedUser = { ...user, ...updateUserDto, avatar: file?.path || user.avatar };
    
    return updatedUser;
  
}
  

  remove(userId: number) {
    const user = database.find(user => user.id === userId);
    if (!user) {
      return { message: `User with id ${userId} not found` };
    }
    database = database.filter(user => user.id !== userId);
    return { message: `User with id ${userId} removed successfully`
    
  }
  }
}