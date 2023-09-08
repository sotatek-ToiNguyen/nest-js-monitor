import {
  BadRequestException,
  Param,
  Body,
  Controller,
  Req,
  Post,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from '../../response/response-interceptor';
import { UserEntity } from './user.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth-guard';
import { CreateUserBodyDto } from './dto/create-user-body.dto';
import { Role } from '../auth/role/role.enum';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { HttpStatusCodeDescription } from '../../response';
import { Auth } from '../../common/decorators/auth.decorator';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @Auth(Role.Admin)
  public async getAllUsers(
    @Req() req,
    @Param('id') id: number,
  ): Promise<UserEntity | null> {
    return this.userService.getUser(req.user.id);
  }

  @Post('/')
  @ApiBearerAuth('access_token')
  @ApiOperation({ summary: 'Create a user' })
  @ApiCreatedResponse({ description: HttpStatusCodeDescription.CREATED })
  @ApiInternalServerErrorResponse({
    description: HttpStatusCodeDescription.INTERNAL_SERVER_ERROR,
  })
  @ApiBadRequestResponse({ description: HttpStatusCodeDescription.BAD_REQUEST })
  @ApiExtraModels(CreateUserBodyDto)
  @ApiBody({
    type: CreateUserBodyDto,
  })
  public async createUser(
    @Body() user: CreateUserBodyDto,
  ): Promise<UserEntity | null> {
    return this.userService.createUser(user);
  }
}
