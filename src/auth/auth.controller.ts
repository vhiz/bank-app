import { Controller, Post, Body } from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from './interface/user,interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}


    @Post('register')
    register(@Body() createUserDto:CreateUserDto): Promise<User>{
        return this.authService.register(createUserDto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() loginDto: CreateUserDto): Promise<User>{
        return this.authService.login(loginDto)
    }

}
