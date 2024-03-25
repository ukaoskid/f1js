import { HttpException, HttpStatus } from '@nestjs/common';
import { CONSTS } from '@commons/commons/models';
import { RedisService } from '@commons/commons/services';

export function Cacheable(
  keyGenerator: (...args: any[]) => string,
  ttl: number = CONSTS.Cache.LONG,
): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const rs = new RedisService();
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const key = keyGenerator(args);

      try {
        // Check the cache first
        const cachedResult = await rs.get(key);
        if (cachedResult !== null) {
          return JSON.parse(cachedResult);
        }
      } catch (error) {
        console.error('Cache error', key);
      }

      try {
        // Call the original method and cache its result
        const result = await originalMethod.apply(this, args);
        await rs.set(key, JSON.stringify(result), ttl);
        return result;
      } catch (error) {
        throw new HttpException(error, error.status || HttpStatus.BAD_REQUEST);
      }
    };
  };
}
