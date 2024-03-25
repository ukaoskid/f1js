import { Module } from '@nestjs/common';
import { RedisService } from '@commons/commons/services';

const PROVIDERS = [RedisService];

@Module({
  providers: [],
  exports: [...PROVIDERS],
})
export class CommonsModule {}
