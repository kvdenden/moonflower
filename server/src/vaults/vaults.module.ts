import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vault } from '../database/entities/vault.entity';
import { VaultsService } from './vaults.service';
import { VaultsGuard } from './vaults.guard';
import { VaultsController } from './vaults.controller';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { AgentWalletsModule } from '../agent-wallets/agent-wallets.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    AgentWalletsModule,
    TypeOrmModule.forFeature([Vault]),
  ],
  providers: [VaultsService, VaultsGuard],
  controllers: [VaultsController],
})
export class VaultsModule {}
