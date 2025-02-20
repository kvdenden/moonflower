import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';
import { VaultsService } from './vaults.service';
import { PrivyAuthGuard } from '../auth/privy-auth.guard';

@Injectable()
export class VaultsGuard implements CanActivate {
  constructor(
    private readonly privyGuard: PrivyAuthGuard,
    private readonly vaultsService: VaultsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await this.privyGuard.canActivate(context);

    const request: Request = context.switchToHttp().getRequest();
    const { userId } = request['auth'] as { userId: string };

    const user = await this.vaultsService.getUser(request.params.vaultId);
    if (user?.privyId !== userId) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
