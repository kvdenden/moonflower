import { Entity, Column, ManyToOne, OneToOne } from 'typeorm';
import { Base } from './base.entity';
import { User } from './user.entity';
import { AgentWallet } from './agent-wallet.entity';

@Entity('vaults')
export class Vault extends Base {
  @Column({ default: 0 })
  index: number;

  @Column()
  address: string;

  @ManyToOne(() => User, (user) => user.vaults, { onDelete: 'CASCADE' })
  user: User;

  @OneToOne(() => AgentWallet, (agentWallet) => agentWallet.vault)
  agentWallet: AgentWallet;
}
