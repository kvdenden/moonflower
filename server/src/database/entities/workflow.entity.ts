import { Entity, ManyToOne } from 'typeorm';
import { Base } from './base.entity';
import { Vault } from './vault.entity';

@Entity('workflows')
export class Workflow extends Base {
  @ManyToOne(() => Vault, (vault) => vault.workflows, { onDelete: 'CASCADE' })
  vault: Vault;
}
