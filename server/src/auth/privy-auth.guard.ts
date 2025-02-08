import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrivyClient } from '@privy-io/server-auth';
import { Request } from 'express';

@Injectable()
export class PrivyAuthGuard implements CanActivate {
  private privyClient: PrivyClient;

  constructor(private configService: ConfigService) {
    this.privyClient = new PrivyClient(
      configService.getOrThrow('PRIVY_APP_ID'),
      configService.getOrThrow('PRIVY_APP_SECRET'),
    );
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authToken = this.extractAuthToken(request);
    if (!authToken) {
      throw new UnauthorizedException();
    }
    try {
      request['auth'] = await this.privyClient.verifyAuthToken(authToken);
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractAuthToken(request: Request): string | undefined {
    return request.headers['authorization']?.replace('Bearer ', '');
  }
}
