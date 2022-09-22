import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from './schema/user.schema';
import { JwtStrategy } from './strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [MongooseModule.forFeature([{
    name: 'User',
    schema: UserSchema
  }]),
JwtModule.register({})]
})
export class AuthModule {}
