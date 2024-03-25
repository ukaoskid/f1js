import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LiveTimingService } from '@f1js/f1js/services';
import { CarDataProcessor, PositionProcessor } from '@f1js/f1js/processors';

const PROVIDERS = [LiveTimingService, CarDataProcessor, PositionProcessor];

@Module({
  imports: [HttpModule],
  providers: [...PROVIDERS],
  exports: [...PROVIDERS],
})
export class F1jsModule {}
