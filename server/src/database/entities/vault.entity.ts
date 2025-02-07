import { Entity, Column, ManyToOne } from 'typeorm';
import { Base } from './base.entity';
import { User } from './user.entity';

@Entity('vaults')
export class Vault extends Base {
  @Column()
  address: string;

  @ManyToOne(() => User, (user) => user.vaults, { onDelete: 'CASCADE' })
  user: User;
}
