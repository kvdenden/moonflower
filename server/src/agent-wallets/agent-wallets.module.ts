import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentWalletsService } from './agent-wallets.service';
import { AgentWallet } from '../database/entities/agent-wallet.entity';
import { Web3Module } from '../web3/web3.module';

@Module({
  imports: [Web3Module, TypeOrmModule.forFeature([AgentWallet])],
  providers: [AgentWalletsService],
  exports: [AgentWalletsService],
})
export class AgentWalletsModule {}
