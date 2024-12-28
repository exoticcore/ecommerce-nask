import { Repository } from 'typeorm';
import { dataSource } from '../../../config/typeorm.config';
import { Role } from '../../../database/role.entity';

export default class RoleService {
  private readonly RoleRepo: Repository<Role>;

  constructor() {
    this.RoleRepo = dataSource.getRepository(Role);
  }

  public async createRole(title: string) {
    const newTitle = title.toLowerCase();

    const isRole = await this.RoleRepo.findOneBy({ title: newTitle });
    if (isRole) return null;

    const created = await this.RoleRepo.save({ title: newTitle });

    return created;
  }

  public async readAllRole() {
    const roles = await this.RoleRepo.find();

    return roles;
  }

  public async updateRole(id: number, title: string) {
    const isRole = await this.RoleRepo.findOne({ where: { id } });
    if (!isRole) return null;

    const check = await this.RoleRepo.findOneBy({ title: title.toLowerCase() });
    if (check) return null;

    isRole.title = title.toLowerCase();

    const updated = await this.RoleRepo.save(isRole);

    return updated;
  }

  public async deleteRole(id: number) {
    const isRole = await this.RoleRepo.findOne({ where: { id } });
    if (!isRole) return null;

    const deleted = await this.RoleRepo.remove(isRole);
    return deleted;
  }
}
