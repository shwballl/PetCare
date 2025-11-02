// src/community/community.controller.ts

import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CommunityService } from './community.service';

@ApiTags('community')
@Controller('community')
export class CommunityController {
    constructor(private communityService: CommunityService) {}

    @ApiOperation({ summary: 'Get the community feed (posts/photos from other users)' })
    @ApiBearerAuth() 
    @ApiResponse({ 
        status: 200, 
        description: 'Returns an array of community posts.',
    })
    @UseGuards(JwtAuthGuard)
    @Get('feed') 
    getFeed(@Req() request: any) {
        return this.communityService.getCommunityFeed(); 
    }
}