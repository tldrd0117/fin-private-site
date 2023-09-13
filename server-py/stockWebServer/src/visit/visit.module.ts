import { Module } from '@nestjs/common';
import { VisitController } from './visit.controller';
import { VisitService } from './visit.service';
import { PostService } from 'post/post.service';
import { UserService } from 'user/user.service';
import { TagsService } from 'tags/tags.service';
import { AuthService } from 'auth/auth.service';
import visitSchema from './schemas/visit.schema';
import visitHistorySchema from 'visitHistory/schemas/visitHistory.schema';
import postSchema from 'post/schemas/post.schema';
import userSchema from 'user/schemas/user.schema';
import roleSchema from 'role/schemas/role.schema';
import tagsSchema from 'tags/schemas/tags.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature(
            [{ name: 'User', schema: userSchema }],
            'log-site',
        ),
        MongooseModule.forFeature(
            [{ name: 'Role', schema: roleSchema }],
            'log-site',
        ),
        MongooseModule.forFeature(
            [{ name: 'Tag', schema: tagsSchema }],
            'log-site',
        ),
        MongooseModule.forFeature(
            [{ name: 'Post', schema: postSchema }],
            'log-site',
        ),
        MongooseModule.forFeature(
            [{ name: 'Visit', schema: visitSchema }],
            'log-site',
        ),
        MongooseModule.forFeature(
            [{ name: 'VisitHistory', schema: visitHistorySchema }],
            'log-site',
        ),
    ],
    controllers: [VisitController],
    providers: [
        AuthService,
        VisitService,
        PostService,
        UserService,
        TagsService,
    ],
})
export class VisitModule {}
