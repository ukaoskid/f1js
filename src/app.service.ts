import { Injectable } from '@nestjs/common';
import { LiveTimingService } from '@f1js/f1js/services';

@Injectable()
export class AppService {
  constructor(private lt: LiveTimingService) {}
  getHello() {
    return this.lt.getCarData(
      {
        year: 2022,
        name: 'Mexico_City_Grand_Prix',
        weekendDate: '2022-10-30',
        session: 'Race',
        sessionDate: '2022-10-30',
      },
      '63',
    );
  }
}
