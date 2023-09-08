import { applyDecorators, UseGuards, UnauthorizedException } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';
import { ApiBearerAuth,ApiUnauthorizedResponse } from '@nestjs/swagger';
import {RolesGuard} from "../../modules/auth/role/roles.guard"
import { JwtAuthGuard } from '../../modules/auth/guard/jwt-auth-guard';
import { Role } from '../../modules/auth/role/role.enum';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized 111' }),
  );
}
