import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Endpoint, ENDPOINTS, ICarData, IPosition, Meeting } from '@f1js/f1js/models';
import { CarDataProcessor, PositionProcessor } from '@f1js/f1js/processors';
import { Cacheable } from '@commons/commons';
import { buildMeetingCacheKey } from '@f1js/f1js/utils';

const BASE_URL = 'https://livetiming.formula1.com/static/';

@Injectable()
export class LiveTimingService {
  constructor(
    private http: HttpService,
    private cd: CarDataProcessor,
    private ps: PositionProcessor,
  ) {}

  private get(endpoint: Endpoint, meeting: Meeting) {
    const path = `${meeting.year}/${meeting.weekendDate}_${meeting.name}/${meeting.sessionDate}_${meeting.session}/${endpoint.endpoint}`;
    const url = `${BASE_URL}${path}`;
    return firstValueFrom(this.http.get(url))
      .then((value) => value.data)
      .catch((reason) => {
        throw new HttpException(reason.response.data, reason.response.status);
      });
  }

  @Cacheable((args) => buildMeetingCacheKey(ENDPOINTS.CAR_DATA, args[0]))
  private async getAllCarData(meeting: Meeting): Promise<ICarData[]> {
    const data = await this.get(ENDPOINTS.CAR_DATA, meeting);
    return this.cd.process(data);
  }

  async getCarData(meeting: Meeting, car: string): Promise<ICarData[]> {
    const data = await this.getAllCarData(meeting);
    return data.map((carData) => ({
      time: carData.time,
      cars: carData.cars[car] ? { [car]: carData.cars[car] } : {},
    }));
  }

  @Cacheable((args) => buildMeetingCacheKey(ENDPOINTS.POSITION, args[0]))
  private async getAllPosition(meeting: Meeting): Promise<IPosition[]> {
    const data = await this.get(ENDPOINTS.POSITION, meeting);
    return this.ps.process(data);
  }

  async getCarPosition(meeting: Meeting, car: string): Promise<IPosition[]> {
    const data = await this.getAllPosition(meeting);
    return data.map((carData) => ({
      time: carData.time,
      cars: carData.cars[car] ? { [car]: carData.cars[car] } : {},
    }));
  }
}
