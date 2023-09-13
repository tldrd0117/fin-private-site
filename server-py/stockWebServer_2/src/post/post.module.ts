import { Module } from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { UserService } from 'user/user.service';
import { TagsService } from 'tags/tags.service';
import { MongooseModule } from '@nestjs/mongoose';
import postSchema from './schemas/post.schema';
import userSchema from 'user/schemas/user.schema';
import roleSchema from 'role/schemas/role.schema';
import tagSchema from 'tags/schemas/tags.schema';

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                { name: 'Post', schema: postSchema },
                { name: 'User', schema: userSchema },
                { name: 'Role', schema: roleSchema },
                { name: 'Tag', schema: tagSchema },
            ],
            'log-site',
        ),
    ],
    controllers: [PostController],
    providers: [AuthService, PostService, UserService, TagsService],
})
export class PostModule {}
