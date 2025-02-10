import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { config as dbConfig } from './database/config';
import { UsersModule } from './users/users.module';
import { VaultsModule } from './vaults/vaults.module';
import { AgentWalletsModule } from './agent-wallets/agent-wallets.module';
import { Web3Module } from './web3/web3.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({ ...dbConfig, autoLoadEntities: true }),
    AuthModule,
    Web3Module,
    UsersModule,
    VaultsModule,
    AgentWalletsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
