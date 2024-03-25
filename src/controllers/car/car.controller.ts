import { Controller, Get, Param } from '@nestjs/common';
import { CarService } from '../../services/car/car.service';

@Controller('car')
export class CarController {
  constructor(private cs: CarService) {}

  @Get(':id/telemetry')
  getCarData(@Param('id') car: string) {
    return this.cs.getCarData(
      {
        year: 2022,
        name: 'Mexico_City_Grand_Prix',
        weekendDate: '2022-10-30',
        session: 'Race',
        sessionDate: '2022-10-30',
      },
      car,
    );
  }

  @Get(':id/position')
  getCarPosition(@Param('id') car: string) {
    return this.cs.getCarPosition(
      {
        year: 2022,
        name: 'Mexico_City_Grand_Prix',
        weekendDate: '2022-10-30',
        session: 'Race',
        sessionDate: '2022-10-30',
      },
      car,
    );
  }
}
