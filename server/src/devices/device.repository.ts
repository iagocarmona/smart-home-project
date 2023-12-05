import { Injectable } from '@nestjs/common';
import { DeviceEntity } from '../entities/device.entity';
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

    query.orderBy({ [`${alias}.id`]: 'ASC' });
    return query.getManyAndCount();
  }

  async getById(id: number) {
    const alias = 'devices';
    const query = this.createQueryBuilder(alias);

    query.where(`${alias}.id = :id`, { id });
    return query.getOne();
  }

  async getByName(name: string) {
    const alias = 'devices';
    const query = this.createQueryBuilder(alias);

    query.where(`${alias}.name = :name`, { name });
    return query.getOne();
  }
}
