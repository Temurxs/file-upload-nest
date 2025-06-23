import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [UserModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), 

    }),

    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    }),

    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
