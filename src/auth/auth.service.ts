import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interface/user,interface';
import * as argon from "argon2";
import { JwtService } from '@nestjs/jwt/dist';
import * as crypto from 'crypto'

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>, private jwt: JwtService){}


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
            password: hashed,
            tokenId: await crypto.randomBytes(10).toString('hex')
        })

        return await newUser.save()

    }

    async login(user:User): Promise<{acess_token: string}>{
        const userExist = await this.userModel.findOne({email: user.email})

        if(!userExist){
            throw new ForbiddenException('account doese not exist!')
        }

        const verified = await argon.verify(userExist.password, user.password)
        if(!verified) throw new ForbiddenException('password incorrect')

        return this.signinToken(user.tokenId, user.email)
    }


    async signinToken(tokenId: string, email: string): Promise<{acess_token: string}>{
        const payload = {
            sub:tokenId,
            email 
        }

        const token =  await this.jwt.signAsync(payload, {expiresIn: "20m", secret:process.env.TOKEN})

        return{
            acess_token : token
        }
    }
    
}
