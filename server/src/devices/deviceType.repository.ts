import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceTypesEntity } from 'src/entities/deviceType.entity';

@Injectable()
export class DeviceTypesRepository extends Repository<DeviceTypesEntity> {
  constructor(
    @InjectRepository(DeviceTypesEntity)
    repository: Repository<DeviceTypesEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async list() {
    const alias = 'device_types';
    const query = this.createQueryBuilder(alias);

    query.orderBy({ [`${alias}.id`]: 'ASC' });
    return query.getManyAndCount();
  }
}
