import { Inject, Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository, In } from 'typeorm';
import { UserEntity } from './user.entity';
import {CreateUserBodyDto} from "./dto/create-user-body.dto";
import * as bcrypt from 'bcrypt';
import { saltOrRounds } from "../../common/config";

@Injectable()
export class UserService {
    private readonly userRepository: Repository<UserEntity>;

    constructor(
        @Inject('DATABASE_CONNECTION') private databaseConnection: DataSource,
    ) {
        this.userRepository = databaseConnection.getRepository<UserEntity>(UserEntity);
    }

    public async getUser(id: number): Promise<UserEntity | null> {
        try{
            return await this.userRepository.findOneBy({ id: id });
        }catch(error){
            throw new InternalServerErrorException();
        }

    }

    public async createUser(user: CreateUserBodyDto): Promise<UserEntity | null> {
        try{
            const entity = new UserEntity();
            entity.walletAddress = user.walletAddress;
            entity.password = await bcrypt.hash(user.password, saltOrRounds);
            entity.email = user.email;

            return await this.userRepository.save(entity);

        }catch(error){
            console.log(error)
            throw new InternalServerErrorException('Internal server error!');
        }

    }

    public async findOne(email: string):Promise<UserEntity | null> {
    try{
        return await this.userRepository.findOneBy({ email: email });
    }catch(error){
        console.log(error)
        throw new InternalServerErrorException('Internal server error!');
    }

}

}
