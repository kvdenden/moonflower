import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workflow } from '../database/entities/workflow.entity';

@Injectable()
export class WorkflowsService {
  constructor(
    @InjectRepository(Workflow)
    private readonly workflowsRepository: Repository<Workflow>,
  ) {}

  async getWorkflows(vaultId: string) {
    return this.workflowsRepository.find({
      where: { vault: { id: vaultId } },
    });
  }

  async getWorkflow(workflowId: string) {
    return this.workflowsRepository.findOne({
      where: { id: workflowId },
    });
  }

  async getUser(workflowId: string) {
    const workflow = await this.workflowsRepository.findOne({
      where: { id: workflowId },
      relations: ['vault', 'vault.user'],
    });

    return workflow?.vault.user;
  }

  async createWorkflow(vaultId: string) {
    const workflow = this.workflowsRepository.create({
      vault: { id: vaultId },
    });
    await this.workflowsRepository.save(workflow);

    return this.getWorkflow(workflow.id);
  }

  async executeWorkflow(workflowId: string) {
    const workflow = await this.getWorkflow(workflowId);

    if (!workflow) return;

    console.log('Executing workflow ', workflow.id);
  }
}
