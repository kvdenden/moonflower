import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { PrivyAuthGuard } from '../auth/privy-auth.guard';
import { VaultsService } from './vaults.service';

@Controller('vaults')
export class VaultsController {
  constructor(private vaultsService: VaultsService) {}

  @UseGuards(PrivyAuthGuard)
  @Post()
  async registerVault(
    @Req() request: Request,
    @Body('address') address: string,
  ) {
    const { userId } = request['auth'] as { userId: string };
    // const { address } = request.body as { address: string };

    console.log('Registering vault for user', userId, address);

    const vault = await this.vaultsService.registerVault(userId, address);

    return vault;
  }
}
