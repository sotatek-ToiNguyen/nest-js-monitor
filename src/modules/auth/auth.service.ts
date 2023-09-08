import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) {}

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if(!user){
            throw new UnauthorizedException('Email and password not found!');
        }
        const isMatch = await bcrypt.compare(pass, user?.password);

        if (!isMatch){
            throw new UnauthorizedException('Email and password not found!');
        }
        const payload = { id: user.id, username: user.email, addressWallet: user.walletAddress };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
