import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {DatabaseModule} from "../../database/database.module";
import {RolesGuard} from "../auth/role/roles.guard"

@Module({
    imports: [ DatabaseModule ],
    controllers: [ UserController ],
    providers: [UserService ],
    exports: [ UserService ],
})
export class UserModule {}
