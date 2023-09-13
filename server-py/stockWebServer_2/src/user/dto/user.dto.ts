import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

export class UserJoin {
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
    @ApiPropertyOptional()
    role?: string;
}

export class UserLogin {
    @ApiProperty({
        example: process.env.TEST_USER,
    })
    email: string;
    @ApiProperty({
        example: process.env.TEST_PASSWORD,
    })
    password: string;
}
