import { Injectable } from '@nestjs/common';
import { DeviceEntity } from './entities/device.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DeviceRepository extends Repository<DeviceEntity> {
  constructor(
    @InjectRepository(DeviceEntity) repository: Repository<DeviceEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async list() {
    const alias = 'devices';
    const query = this.createQueryBuilder(alias);

    query.orderBy({ [`${alias}.id`]: 'DESC' });
    return query.getManyAndCount();
  }
}
