import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import responseUtils from 'common/utils/responseUtils';
import { AuthGuard } from 'common/auth.guard';
import { EncPipe } from 'common/enc.pipe';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PostService } from './post.service';
import {
    PostCreate,
    PostDelete,
    PostGet,
    PostGetList,
    PostSearchList,
    PostUpdate,
} from './dto/post.dto';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get('/list')
    async getPostList(@Query() postGetList: PostGetList) {
        const result = await this.postService.getList(
            postGetList.limit,
            postGetList.offset,
        );
        return responseUtils.makeSuccessBody(result);
    }

    @Get('/')
    async getPost(@Query() postGet: PostGet) {
        const result = await this.postService.getPost(postGet._id);
        return responseUtils.makeSuccessBody(result);
    }

    @Post('/')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async createPost(@Body(EncPipe) postCreate: PostCreate) {
        const result = await this.postService.post(postCreate);
        return responseUtils.makeSuccessBody(result.toJSON());
    }

    @Post('/list')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async createPostList(@Body(EncPipe) postCreates: Array<PostCreate>) {
        const result = await this.postService.postMany(postCreates);
        return responseUtils.makeSuccessBody({
            list: result,
        });
    }

    @Get('/list/search')
    async searchPostList(@Query() postSearchList: PostSearchList) {
        const result = await this.postService.searchList(
            postSearchList.limit,
            postSearchList.offset,
            postSearchList.word,
        );
        return responseUtils.makeSuccessBody(result);
    }

    @Put('/')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async putPost(@Body(EncPipe) postUpdate: PostUpdate) {
        const result = await this.postService.putPost(postUpdate);
        return responseUtils.makeSuccessBody(result);
    }

    @Delete('/')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async deletePost(@Body(EncPipe) postDelete: PostDelete) {
        const result = await this.postService.delPost(postDelete._id);
        return responseUtils.makeSuccessBody(result);
    }

    @Delete('/list')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async deletePostList(@Body(EncPipe) postDeletes: Array<PostDelete>) {
        const result = await this.postService.delPosts(
            postDeletes.map((v) => v._id),
        );
        return responseUtils.makeSuccessBody(result);
    }
}
