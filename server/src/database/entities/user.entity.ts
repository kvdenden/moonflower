import { Entity, Column, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { Vault } from './vault.entity';

@Entity('users')
export class User extends Base {
  @Column()
  privyId: string;

  @OneToMany(() => Vault, (vault) => vault.user)
  vaults: Vault[];
}
