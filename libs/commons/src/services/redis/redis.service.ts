import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';
import * as process from 'process';
import { createHash } from 'crypto';
import { CONSTS } from '@commons/commons/models';

@Injectable()
export class RedisService {
  private _client = createClient({
    url: `redis://${process.env.REDIS_HOSTNAME || '127.0.0.1'}:${
      process.env.REDIS_PORT || '6379'
    }`,
  });

  private sha1(input: string) {
    const hash = createHash('sha1');
    hash.update(input);
    return hash.digest('hex');
  }

  constructor() {
    this._client.connect();
    this._client.on('error', (err: any) => console.error('Redis error:', err));
  }

  async get(key: string) {
    return this._client.get(this.sha1(key));
  }

  async getTtl(key: string) {
    return this._client.ttl(this.sha1(key));
  }

  async set(key: string, value: string, ttl: number = CONSTS.Cache.SHORT) {
    const sha1Key = this.sha1(key);
    await this._client.set(sha1Key, value, { EX: ttl });
  }

  async delete(key: string) {
    await this._client.del(this.sha1(key));
  }
}
