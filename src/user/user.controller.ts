import { Controller, Get, UseGuards } from '@nestjs/common';
import { Req } from '@nestjs/common/decorators';
import { Request } from 'express';
import { UserDecorator } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { User } from 'src/auth/interface/user,interface';


@UseGuards(JwtGuard)
@Controller('user')
export class UserController {

    @Get('me')    
    getme(@UserDecorator() user: User){
        return user
    }
}
