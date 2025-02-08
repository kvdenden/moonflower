import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vault } from '../database/entities/vault.entity';
import { VaultsService } from './vaults.service';
import { VaultsController } from './vaults.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Vault])],
  providers: [VaultsService],
  controllers: [VaultsController],
})
export class VaultsModule {}
