import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    type: 'postgres',
    host: process.env.DB_HOST || '',
    port: parseInt(process.env.DB_PORT || '5432', 10) || 5432,
    username: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
    synchronize: false,
    logging: false,
    entities: [ `${__dirname}/../**/*.entity{.ts,.js}` ],
    subscribers: [],
};
