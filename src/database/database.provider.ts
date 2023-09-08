import { DataSource } from 'typeorm';
import { databaseSource } from './data-source';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<DataSource> => {
      return databaseSource.initialize();
    },
  },
];
