import { Repository } from 'typeorm';
import { AccessType } from '../../../database/access-type.entity';
import { dataSource } from '../../../config/typeorm.config';
import { CreateAccessTypeDto } from './dto/access-type.create.dto';
import { Service } from '../../../database/service.entity';
import { UpdateAccessTypeDto } from './dto/access-type.update.dto';

export default class AccessTypeService {
  private readonly accessTypeRepo: Repository<AccessType>;
  private readonly serviceRepo: Repository<Service>;

  constructor() {
    this.accessTypeRepo = dataSource.getRepository(AccessType);
    this.serviceRepo = dataSource.getRepository(Service);
  }

  public async createAccessType(data: CreateAccessTypeDto) {
    const isService = await this.serviceRepo.findOneBy({ id: data.serviceId });

    if (!isService) return null;

    const isUnique = await this.accessTypeRepo.findOneBy({
      title: data.title.toLowerCase(),
      service: isService,
    });

    if (isUnique) return null;

    const created = await this.accessTypeRepo.save({
      title: data.title.toLowerCase(),
      service: isService,
    });

    return created;
  }

  public async getAllAccessTypeByService(serviceId: number) {
    const isService = await this.serviceRepo.findOneBy({ id: serviceId });

    if (!isService) return null;

    const accessTypes = await this.accessTypeRepo.find({
      where: { service: isService },
    });

    return accessTypes;
  }

  public async updateAccessType(
    data: UpdateAccessTypeDto,
    accessTypeId: number
  ) {
    const isAccessType = await this.accessTypeRepo.findOneBy({
      id: accessTypeId,
    });
    if (!isAccessType) return null;

    const isUnique = await this.accessTypeRepo.findOneBy({
      title: data.title.toLowerCase(),
      service: isAccessType.service,
    });
    if (isUnique) return null;

    isAccessType.title = data.title.toLowerCase();

    const updated = await this.accessTypeRepo.save(isAccessType);

    return updated;
  }

  public async deleteAccessType(accessTypeId: number) {
    const isAccessType = await this.accessTypeRepo.findOneBy({
      id: accessTypeId,
    });

    if (!isAccessType) return null;

    const deleted = await this.accessTypeRepo.remove(isAccessType);

    return deleted;
  }
}
