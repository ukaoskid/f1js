import { Injectable } from '@nestjs/common';
import { LiveTimingService } from '@f1js/f1js/services';
import { Meeting } from '@f1js/f1js/models';

@Injectable()
export class CarService {
  constructor(private lt: LiveTimingService) {}

  getCarData(meeting: Meeting, car: string) {
    return this.lt.getCarData(meeting, car);
  }

  getCarPosition(meeting: Meeting, car: string) {
    return this.lt.getCarPosition(meeting, car);
  }
}
