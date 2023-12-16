export interface DeviceDTO {
    id: number;
    name: string;
    description: string;
    deviceTypeId: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}