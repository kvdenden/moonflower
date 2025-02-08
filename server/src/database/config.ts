import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export const config: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,

  entities: [__dirname + '/entities/**/*.entity.{ts,js}'],
  synchronize: false,

  migrationsRun: true,
  migrations: [__dirname + '/migrations/**/*.{ts,js}'],
};

const dataSource = new DataSource(config);

export default dataSource;
