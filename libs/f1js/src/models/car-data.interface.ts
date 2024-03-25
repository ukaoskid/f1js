import { ICars } from '@f1js/f1js/models/cars.interface';

export interface ICarDataTelemetry {
  rpm: number;
  speed: number;
  nGear: number;
  throttle: number;
  brake: number;
  drs: number;
}

export interface ICarData {
  time: number;
  cars: ICars<ICarDataTelemetry>;
}
