import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../users/user.service';
import { Role } from '../role/role.enum';
interface JwtPayload {
  id: number;
  key?: string;
  chainId?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'hello nest js',
    });
  }

  async validate(payload: JwtPayload, role: Role): Promise<any> {
    console.log(111);
    const user = await this.userService.getUser(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return { ...user };
  }
}
