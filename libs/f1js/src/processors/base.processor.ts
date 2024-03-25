import { Endpoint } from '@f1js/f1js/models/live-timining.interface';
import { inflateRawSync } from 'zlib';

export abstract class BaseProcessor {
  abstract process(data: any): any;

  private uncompress(data: string) {
    try {
      const decodedData = Buffer.from(data, 'base64');
      const result = inflateRawSync(decodedData);
      return result.toString('utf-8');
    } catch (error) {
      console.log(data, error);
    }
  }

  protected preProcess(endpoint: Endpoint, rawData: any) {
    let data: any[];

    if (!endpoint.isStream) {
      return rawData;
    }

    if (endpoint.isStream) {
      const rows = (rawData as string).split('\r\n');
      const cleanRows = rows.filter((string) => string !== '');
      data = cleanRows.map((row) => {
        const split = row.split('"').filter((part) => part);
        return split[1];
      });
    }

    if (endpoint.isCompressed) {
      const result = [];
      data.forEach((value) => result.push(JSON.parse(this.uncompress(value))));
      return result;
    }

    data.forEach((value) => JSON.parse(value));
    return data;
  }
}
