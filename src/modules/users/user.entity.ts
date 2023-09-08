import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import {Role} from "../auth/role/role.enum"

@Entity({ name: 'users' })
export class UserEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'character varying', unique: true, default: false, nullable: true })
    public email: string;

    @Column({ type: 'enum', enum: Role, default: Role.User })
    public role: Role;

    @Exclude()
    @Column({ type: 'character varying', default: false, nullable: true })
    public password: string;

    @Column({ type: 'character varying', name: 'walletaddress', default: false, nullable: false })
    public walletAddress: string;

    @CreateDateColumn({ type: 'time without time zone', name: 'created_at', default: () => 'CURRENT_TIMESTAMP(6)',
        nullable: false })
    public createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp without time zone', name: 'updated_at',
        default: () => 'CURRENT_TIMESTAMP(6)' })
    public updatedAt: Date;

}
