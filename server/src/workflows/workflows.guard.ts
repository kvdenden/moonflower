import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';
import { WorkflowsService } from './workflows.service';
import { PrivyAuthGuard } from '../auth/privy-auth.guard';

@Injectable()
export class WorkflowsGuard implements CanActivate {
  constructor(
    private readonly privyGuard: PrivyAuthGuard,
    private readonly workflowsService: WorkflowsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await this.privyGuard.canActivate(context);

    const request: Request = context.switchToHttp().getRequest();
    const { userId } = request['auth'] as { userId: string };

    const user = await this.workflowsService.getUser(request.params.workflowId);
    if (user?.privyId !== userId) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
