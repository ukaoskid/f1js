import { BaseProcessor } from '@f1js/f1js/processors/base.processor';
import {
  ENDPOINTS,
  ICarData,
  ICarDataTelemetry,
  IF1CarData,
} from '@f1js/f1js/models';
import { ICars } from '@f1js/f1js/models/cars.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CarDataProcessor extends BaseProcessor {
  process(data: any): ICarData[] {
    const carData: ICarData[] = [];
    const preProcessed: IF1CarData[] = this.preProcess(
      ENDPOINTS.CAR_DATA,
      data,
    );

    preProcessed.forEach((line) => {
      line.Entries.forEach((entry) => {
        const cars: ICars<ICarDataTelemetry> = {};
        Object.keys(entry.Cars).forEach((car) => {
          cars[car] = {
            rpm: entry.Cars[car].Channels['0'],
            speed: entry.Cars[car].Channels['2'],
            nGear: entry.Cars[car].Channels['3'],
            throttle: entry.Cars[car].Channels['4'],
            brake: entry.Cars[car].Channels['5'],
            drs: entry.Cars[car].Channels['45'],
          };
        });
        carData.push({
          time: new Date(entry.Utc).getTime(),
          cars,
        });
      });
    });

    return carData;
  }
}
