import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';
import ICacheProvider from '../models/ICacheProvider';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  // Criação de cache
  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  // Recuperação de cache
  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T; // Convertendo tipo de data

    return parsedData;
  }

  // Invalidação do cache
  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }

  // Invalidação do cache por prefixo
  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`);

    const pipeline = this.client.pipeline(); // pipeline -> Execução de multiplas operações

    keys.forEach(key => {
      pipeline.del(key);
    });

    await pipeline.exec(); // Efetua todas exclusões ao mesmo tempo
  }
}
