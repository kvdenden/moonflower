import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { Base } from './base.entity';
import { Vault } from './vault.entity';

@Entity('agent_wallets')
export class AgentWallet extends Base {
  @Column()
  address: string;

  @Column({ nullable: true })
  approval: string;

  @OneToOne(() => Vault, (vault) => vault.agentWallet, { onDelete: 'CASCADE' })
  @JoinColumn()
  vault: Vault;
}
