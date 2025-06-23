import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

let database = {
  posts: [
    {
      id: 1,
      title: 'First Post',
      content: 'This is the content of the first post.',
      authorId: 101,
      image: '/images/post1.jpg',
    },
    {
      id: 2,
      title: 'Second Post',
      content: 'This is the content of the second post.',
      authorId: 102,
      image: '/images/post2.jpg',
    },
    {
      id: 3,
      title: 'Third Post',
      content: 'This is the content of the third post.',
      authorId: 103,
      image: '/images/post3.jpg',
    },
    {
      id: 4,
      title: 'Fourth Post',
      content: 'This is the content of the fourth post.',
      authorId: 104,
      image: '/images/post4.jpg',
    },
    {
      id: 5,
      title: 'Fifth Post',
      content: 'This is the content of the fifth post.',
      authorId: 105,
      image: '/images/post5.jpg',
    },
  ]
}

@Injectable()
export class PostsService {

  
  create(createPostDto: CreatePostDto, user_id: number, image : string) {
    createPostDto.authorId = user_id
    
    createPostDto.id = database.posts?.length + 1 || 1;
    console.log(createPostDto.authorId, createPostDto.id, image);
    
    const newPost = { ...createPostDto, image: image }
      
    return {newPost, message: 'Post created successfully', user_id: user_id};

  }

  findAll() {
    return database
  }

  findOne(id: number) {
    const post = database.posts.find(post => post.id === id);
    return post ? post : { message: `Post with id ${id} not found` };
  }

  update(id: number, updatePostDto: UpdatePostDto, author_id: number) {
     const post = database.posts.find(post => post.id === id);
    if (!post) {
      return { message: `Post with id ${id} not found` };
  }
  const postAuthorId = post?.authorId
  if( postAuthorId !== author_id) {
    return { message: `You are not authorized to update this post` };
      
  }
  const updatedPost = { ...post, ...updatePostDto };
  database.posts = database.posts.map(p => p.id === id ? updatedPost : p);
  return { updatedPost, message: `Post with id ${id} updated successfully` };
  
}

  remove(id: number) {
    const post = database.posts.filter(post => post.id !== id);
    return {message : `Post with id ${id} removed successfully`}
}
}
