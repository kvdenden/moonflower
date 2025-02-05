import { Controller, Post, UseGuards } from '@nestjs/common';
import { PrivyAuthGuard } from '../auth/privy-auth.guard';

@Controller('wallets')
export class WalletController {
  @UseGuards(PrivyAuthGuard)
  @Post()
  async createWallet() {
    console.log('Creating wallet...');
    return { message: 'Wallet created' };
  }
}
