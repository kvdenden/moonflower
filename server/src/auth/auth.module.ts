import { Module } from '@nestjs/common';
import { PrivyAuthGuard } from './privy-auth.guard';

@Module({
  providers: [PrivyAuthGuard],
  exports: [PrivyAuthGuard],
})
export class AuthModule {}
