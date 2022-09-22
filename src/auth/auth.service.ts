import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interface/user,interface';
import * as argon from "argon2";
import * as crypto from 'crypto'
@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>){}


    async register(user:User): Promise<User>{
        const userExist = await this.userModel.findOne({email: user.email})

        if(userExist){
            throw new ForbiddenException('email already exist')
        }

        const usernameExit = await this.userModel.findOne({username: user.username})

        if(usernameExit) throw new ForbiddenException('username already exist')

        const hashed = await argon.hash(user.password)
        const newUser = await new this.userModel({
            email: user.email,
            username: user.username,
            password: hashed
        })

        return await newUser.save()

    }

    async login(user:User): Promise<User>{
        const userExist = await this.userModel.findOne({email: user.email})

        if(!userExist){
            throw new ForbiddenException('account doese not exist!')
        }

        const verified = await argon.verify(userExist.password, user.password)
        if(!verified) throw new ForbiddenException('password incorrect')

        return userExist
    }
}
