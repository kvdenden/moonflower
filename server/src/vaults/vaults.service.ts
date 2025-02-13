import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vault } from '../database/entities/vault.entity';
import { UsersService } from '../users/users.service';
import { AgentWalletsService } from '../agent-wallets/agent-wallets.service';

@Injectable()
export class VaultsService {
  constructor(
    @InjectRepository(Vault)
    private readonly vaultsRepository: Repository<Vault>,
    private readonly usersService: UsersService,
    private readonly agentWalletsService: AgentWalletsService,
  ) {}

  async getVaults(userId: string) {
    const user = await this.usersService.findOrCreateUser(userId);

    return this.vaultsRepository.find({
      where: { user: { id: user.id } },
      relations: ['agentWallet'],
    });
  }

  async getVault(vaultId: string) {
    return this.vaultsRepository.findOne({
      where: { id: vaultId },
      relations: ['agentWallet'],
    });
  }

  async registerVault(userId: string, index: number, address: string) {
    const user = await this.usersService.findOrCreateUser(userId);

    let vault = await this.vaultsRepository.findOne({
      where: { user: { id: user.id }, address },
    });

    if (!vault) {
      vault = this.vaultsRepository.create({ user, index, address });
      await this.vaultsRepository.save(vault);

      await this.agentWalletsService.createAgentWallet(vault.id);
    }

    return this.getVault(vault.id);
  }

  async approveAgentWallet(vaultId: string, approval: string) {
    await this.agentWalletsService.approveAgentWallet(vaultId, approval);
  }
}
