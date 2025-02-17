import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vault } from '../database/entities/vault.entity';
import { UsersService } from '../users/users.service';
import { AgentWalletsService } from '../agent-wallets/agent-wallets.service';
import { WorkflowsService } from '../workflows/workflows.service';

@Injectable()
export class VaultsService {
  constructor(
    @InjectRepository(Vault)
    private readonly vaultsRepository: Repository<Vault>,
    private readonly usersService: UsersService,
    private readonly agentWalletsService: AgentWalletsService,
    private readonly workflowsService: WorkflowsService,
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

  async getUser(vaultId: string) {
    const vault = await this.vaultsRepository.findOne({
      where: { id: vaultId },
      relations: ['user'],
    });

    return vault?.user;
  }

  async getWorkflows(vaultId: string) {
    return this.workflowsService.getWorkflows(vaultId);
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

  async createWorkflow(vaultId: string) {
    return this.workflowsService.createWorkflow(vaultId);
  }
}
