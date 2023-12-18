export interface DeviceDTO {
    id: number;
    name: string;
    description: string;
    deviceTypeId: number;
    isActive: boolean;
    topic?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}