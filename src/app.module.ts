import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { SwipeHistoryModule } from 'src/swipe-history/swipe-history.module';
import { PaymentHistoryModule } from './payment-history/payment-history.module';
import { MatchModule } from './match/match.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    SwipeHistoryModule,
    PaymentHistoryModule,
    MatchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
