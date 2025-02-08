import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vault } from '../database/entities/vault.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class VaultsService {
  constructor(
    @InjectRepository(Vault)
    private readonly vaultsRepository: Repository<Vault>,
    private readonly usersService: UsersService,
  ) {}

  async registerVault(userId: string, address: string) {
    const user = await this.usersService.findOrCreateUser(userId);

    let vault = await this.vaultsRepository.findOne({
      where: { user, address },
    });

    console.log('vault', vault);

    if (!vault) {
      vault = this.vaultsRepository.create({ user, address });
      await this.vaultsRepository.save(vault);
    }

    return vault.address;
  }
}
