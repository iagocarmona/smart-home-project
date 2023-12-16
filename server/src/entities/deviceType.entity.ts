import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'device_types' })
export class DeviceTypesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'name' })
  name: string;
}
