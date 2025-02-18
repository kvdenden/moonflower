import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workflow } from '../database/entities/workflow.entity';
import { WorkflowsService } from './workflows.service';
import { WorkflowsGuard } from './workflows.guard';
import { WorkflowsController } from './workflows.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Workflow])],
  providers: [WorkflowsService, WorkflowsGuard],
  controllers: [WorkflowsController],
  exports: [WorkflowsService],
})
export class WorkflowsModule {}
