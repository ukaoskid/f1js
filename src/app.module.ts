import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { F1jsModule } from '@f1js/f1js';
import { CarService } from './services/car/car.service';
import { CarController } from './controllers/car/car.controller';

@Module({
  imports: [F1jsModule],
  controllers: [AppController, CarController],
  providers: [AppService, CarService],
})
export class AppModule {}
