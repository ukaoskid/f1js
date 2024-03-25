import { BaseProcessor } from '@f1js/f1js/processors/base.processor';
import {
  ENDPOINTS,
  IF1Position,
  IPosition,
  IPositionData,
} from '@f1js/f1js/models';
import { ICars } from '@f1js/f1js/models/cars.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PositionProcessor extends BaseProcessor {
  process(data: any): IPosition[] {
    const positionData: IPosition[] = [];
    const preProcessed: IF1Position[] = this.preProcess(
      ENDPOINTS.POSITION,
      data,
    );

    preProcessed.forEach((line) => {
      line.Position.forEach((position) => {
        const cars: ICars<IPositionData> = {};
        Object.keys(position.Entries).forEach((car) => {
          cars[car] = {
            status: position.Entries[car].Status,
            x: position.Entries[car].X,
            y: position.Entries[car].Y,
            z: position.Entries[car].Z,
          };
        });
        positionData.push({
          time: new Date(position.Timestamp).getTime(),
          cars,
        });
      });
    });

    return positionData;
  }
}
