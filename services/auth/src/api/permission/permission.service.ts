import { Repository } from 'typeorm';
import { Role } from '../../database/role.entity';
import { Permission } from '../../database/permission.entity';
import { AccessType } from '../../database/access-type.entity';
import { dataSource } from '../../config/typeorm.config';

export default class PermissionService {
  private readonly permissionRepo: Repository<Permission>;
  private readonly roleRepo: Repository<Role>;
  private readonly accessTypeRepo: Repository<AccessType>;

  constructor() {
    this.permissionRepo = dataSource.getRepository(Permission);
    this.roleRepo = dataSource.getRepository(Role);
    this.accessTypeRepo = dataSource.getRepository(AccessType);
  }

  public async createPermission() {}

  public async getPermissionByRole() {
    const permissions = await this.permissionRepo.find({
      relations: ['role', 'accessType', 'scope'],
      loadRelationIds: true,
      where: { role: { title: 'admin' } },
    });

    return permissions;
  }

  public async updatePermission() {}

  public async deletePermission() {}
}
