import { Controller, Post, Body } from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginBodyDto} from "./dto"
import {UserEntity} from "../users/user.entity"

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('/login')
    public async login(
        @Body() loginBodyDto: LoginBodyDto,
    ): Promise<{ accessToken: string; user: UserEntity | null }> {
        console.log(11111);
        return await this.authService.signIn(loginBodyDto.email, loginBodyDto.password);
    }
}
