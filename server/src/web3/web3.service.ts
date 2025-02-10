import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createPublicClient, http } from 'viem';

import { base, baseSepolia, anvil } from 'viem/chains';

@Injectable()
export class Web3Service {
  constructor(private readonly configService: ConfigService) {}

  publicClient() {
    return createPublicClient({
      chain: this.chain(),
      transport: http(this.rpc()),
    });
  }

  chain() {
    switch (this.configService.get('CHAIN')) {
      case 'mainnet':
        return base;
      case 'testnet':
        return baseSepolia;
      default:
        return anvil;
    }
  }

  rpc() {
    const apiKey = this.configService.getOrThrow<string>('ALCHEMY_API_KEY');

    switch (this.configService.get('CHAIN')) {
      case 'mainnet':
        return `https://base-mainnet.g.alchemy.com/v2/${apiKey}`;
      case 'testnet':
        return `https://base-sepolia.g.alchemy.com/v2/${apiKey}`;
      default:
        return 'http://127.0.0.1:8545';
    }
  }

  bundlerRpc() {
    return this.configService.getOrThrow<string>('BUNDLER_RPC');
  }

  paymasterRpc() {
    return this.configService.getOrThrow<string>('PAYMASTER_RPC');
  }
}
