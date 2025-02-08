import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { config as dbConfig } from './database/config';
import { UsersModule } from './users/users.module';
import { VaultsModule } from './vaults/vaults.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({ ...dbConfig, autoLoadEntities: true }),
    UsersModule,
    VaultsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
