import { Entity, Column, OneToOne } from 'typeorm';
import { Base } from './base.entity';
import { Vault } from './vault.entity';

@Entity('agent_wallets')
export class AgentWallet extends Base {
  @Column()
  address: string;

  @Column()
  approval: string;

  @OneToOne(() => Vault, (vault) => vault.agentWallet, { onDelete: 'CASCADE' })
  vault: Vault;
}
