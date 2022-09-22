import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {PassportStrategy} from '@nestjs/passport'
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../interface/user,interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(@InjectModel('User') private readonly userModel: Model<User> ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.TOKEN
        })
    }

    async validate(payload: {sub: string, email: string}){
        const user = await this.userModel.findOne({tokenId:payload.sub})

        delete user.password
        return user
    }
}