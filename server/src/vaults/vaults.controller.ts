import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  UseGuards,
  Param,
} from '@nestjs/common';
import { Request } from 'express';
import { PrivyAuthGuard } from '../auth/privy-auth.guard';
import { VaultsService } from './vaults.service';
import { VaultsGuard } from './vaults.guard';

@Controller('vaults')
export class VaultsController {
  constructor(private vaultsService: VaultsService) {}

  @UseGuards(PrivyAuthGuard)
  @Get()
  async getVaults(@Req() request: Request) {
    const { userId } = request['auth'] as { userId: string };

    const vaults = await this.vaultsService.getVaults(userId);

    return vaults;
  }

  @UseGuards(PrivyAuthGuard)
  @Post()
  async registerVault(
    @Req() request: Request,
    @Body() body: { index: number; address: string },
  ) {
    const { userId } = request['auth'] as { userId: string };
    const { index, address } = body;

    const vault = await this.vaultsService.registerVault(
      userId,
      index,
      address,
    );

    return vault;
  }

  @Get(':vaultId')
  async getVault(@Param('vaultId') vaultId: string) {
    return this.vaultsService.getVault(vaultId);
  }

  @UseGuards(VaultsGuard)
  @Post(':vaultId/approve')
  async approveAgentWallet(
    @Param('vaultId') vaultId: string,
    @Body('approval') approval: string,
  ) {
    return this.vaultsService.approveAgentWallet(vaultId, approval);
  }
}
