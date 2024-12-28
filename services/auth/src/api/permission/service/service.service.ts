import { Repository } from 'typeorm';
import { Service } from '../../../database/service.entity';
import { dataSource } from '../../../config/typeorm.config';
import { CreateServiceDto } from './dto/service.create.dto';
import { UpdateServiceDto } from './dto/service.update.dto';

export default class ServiceService {
  private readonly serviceRepo: Repository<Service>;

  constructor() {
    this.serviceRepo = dataSource.getRepository(Service);
  }

  public async createService(data: CreateServiceDto) {
    const newName = data.name.toLowerCase();
    const isService = await this.serviceRepo.findOneBy({ name: newName });

    if (isService) return null;

    const created = await this.serviceRepo.save({ name: newName });

    return created;
  }

  public async getAllServices() {
    const services = await this.serviceRepo.find();

    return services;
  }

  public async updateService(data: UpdateServiceDto, serviceId: number) {
    const isService = await this.serviceRepo.findOneBy({ id: serviceId });

    if (!isService) return null;

    const check = await this.serviceRepo.findOneBy({
      name: data.name.toLowerCase(),
    });
    if (check) return null;

    isService.name = data.name.toLowerCase();

    const updated = await this.serviceRepo.save(isService);

    return updated;
  }

  public async deleteService(serviceId: number) {
    const isService = await this.serviceRepo.findOneBy({ id: serviceId });

    if (!isService) return null;

    const deleted = await this.serviceRepo.remove(isService);

    return deleted;
  }
}
