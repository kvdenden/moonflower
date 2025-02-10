import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AgentWallet } from '../database/entities/agent-wallet.entity';
import { getEntryPoint, KERNEL_V3_1 } from '@zerodev/sdk/constants';
import { RemoteSignerMode, toRemoteSigner } from '@zerodev/remote-signer';
import { toECDSASigner } from '@zerodev/permissions/signers';
import { deserializePermissionAccount } from '@zerodev/permissions';
import { Web3Service } from '../web3/web3.service';
import {
  createKernelAccountClient,
  createZeroDevPaymasterClient,
} from '@zerodev/sdk';
import { http } from 'viem';

@Injectable()
export class AgentWalletsService {
  constructor(
    @InjectRepository(AgentWallet)
    private readonly agentWalletsRepository: Repository<AgentWallet>,
    private readonly web3Service: Web3Service,
    private readonly configService: ConfigService,
  ) {}

  async createAgentWallet(vaultId: string) {
    const remoteSigner = await toRemoteSigner({
      apiKey: this.configService.getOrThrow('ZERODEV_API_KEY'),
      mode: RemoteSignerMode.Create,
    });

    const agentWallet = this.agentWalletsRepository.create({
      address: remoteSigner.address,
      vault: { id: vaultId },
    });

    await this.agentWalletsRepository.save(agentWallet);

    return agentWallet;
  }

  async approveAgentWallet(vaultId: string, approval: string) {
    const agentWallet = await this.agentWalletsRepository.findOne({
      where: { vault: { id: vaultId } },
    });

    if (!agentWallet) return;

    agentWallet.approval = approval;
    await this.agentWalletsRepository.save(agentWallet);
  }

  private async kernelClient(vaultId: string) {
    const agentWallet = await this.agentWalletsRepository.findOne({
      where: { vault: { id: vaultId } },
    });

    if (!agentWallet) return;

    const publicClient = this.web3Service.publicClient();
    const entryPoint = getEntryPoint('0.7');
    const kernelVersion = KERNEL_V3_1;

    const remoteSigner = await toRemoteSigner({
      keyAddress: agentWallet.address as `0x${string}`,
      apiKey: this.configService.getOrThrow('ZERODEV_API_KEY'),
      mode: RemoteSignerMode.Get,
    });

    const signer = await toECDSASigner({ signer: remoteSigner });

    const account = await deserializePermissionAccount(
      publicClient,
      entryPoint,
      kernelVersion,
      agentWallet.approval,
      signer,
    );

    const chain = this.web3Service.chain();

    return createKernelAccountClient({
      client: publicClient,
      chain,
      account,
      bundlerTransport: http(this.web3Service.bundlerRpc()),
      paymaster: {
        getPaymasterData: (userOperation) => {
          const paymaster = createZeroDevPaymasterClient({
            chain,
            transport: http(this.web3Service.paymasterRpc()),
          });

          return paymaster.sponsorUserOperation({ userOperation });
        },
      },
    });
  }
}
