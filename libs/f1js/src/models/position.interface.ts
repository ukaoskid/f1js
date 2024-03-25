import { ICars } from '@f1js/f1js/models/cars.interface';

export interface IPositionData {
  status: string;
  x: number;
  y: number;
  z: number;
}

export interface IPosition {
  time: number;
  cars: ICars<IPositionData>;
}
