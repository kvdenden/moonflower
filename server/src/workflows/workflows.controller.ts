import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { WorkflowsService } from './workflows.service';
import { WorkflowsGuard } from './workflows.guard';

@Controller('workflows')
export class WorkflowsController {
  constructor(private readonly workflowsService: WorkflowsService) {}

  @UseGuards(WorkflowsGuard)
  @Get(':workflowId')
  async getWorkflow(@Param('workflowId') workflowId: string) {
    return this.workflowsService.getWorkflow(workflowId);
  }

  @UseGuards(WorkflowsGuard)
  @Post(':workflowId/execute')
  async executeWorkflow(@Param('workflowId') workflowId: string) {
    return this.workflowsService.executeWorkflow(workflowId);
  }
}
