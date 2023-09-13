import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Query,
    Put,
    Delete,
} from '@nestjs/common';
import responseUtils from 'common/utils/responseUtils';
import { AuthGuard } from 'common/auth.guard';
import { EncPipe } from 'common/enc.pipe';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import {
    CategoryCreate,
    CategoryDelete,
    CategoryGetList,
    CategoryUpdate,
} from './dto/category.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get('/list')
    async getCategoryList(@Query() categoryGetList: CategoryGetList) {
        const result = await this.categoryService.getCategory(
            categoryGetList.limit,
            categoryGetList.offset,
        );
        return responseUtils.makeSuccessBody(result);
    }

    @Post('/')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async createCategory(@Body(EncPipe) categoryCreate: CategoryCreate) {
        const result = await this.categoryService.createCategory(
            categoryCreate.name,
        );
        return responseUtils.makeSuccessBody(result.toJSON());
    }

    @Put('/')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async putCategory(@Body(EncPipe) categoryUpdate: CategoryUpdate) {
        const result = await this.categoryService.putCategory(
            categoryUpdate._id,
            categoryUpdate.name,
        );
        return responseUtils.makeSuccessBody(result);
    }

    @Delete('/')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async deleteCategory(@Body(EncPipe) categoryDelete: CategoryDelete) {
        const result = await this.categoryService.deleteCategory(
            categoryDelete._id,
        );
        return responseUtils.makeSuccessBody(result);
    }
}
