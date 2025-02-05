import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), WalletModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
