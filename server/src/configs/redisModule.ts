import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

export const RedisModule = CacheModule.register({
  store: async () =>
    redisStore({
      url: `redis://localhost:6379`,
    }),
  host: 'localhost',
  port: 6379,
});
