import { Repository } from 'typeorm';
import { Employee } from '../api/emp/emp.entity';
import { dataSource } from '../config/typeorm.config';
import { Role } from '../database/role.entity';
import argon2 from 'argon2';
import { Person } from '../api/person/person.entity';
import { Service } from '../database/service.entity';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../config/constant.config';
import { Permission } from '../database/permission.entity';
import { Scope } from '../database/scope.entity';
import { AccessType } from '../database/access-type.entity';

export default class AdminSetting {
  private readonly empRepo: Repository<Employee>;
  private readonly roleRepo: Repository<Role>;
  private readonly personRepo: Repository<Person>;
  private readonly serviceRepo: Repository<Service>;
  private readonly accessTypeRepo: Repository<AccessType>;
  private readonly scopeRepo: Repository<Scope>;
  private readonly permissionRepo: Repository<Permission>;

  private readonly acList: { name: string; accessType: string[] }[];
  private readonly scopeList: string[];

  private readonly adminEmail: string = <string>ADMIN_EMAIL;
  private readonly adminPwd: string = <string>ADMIN_PASSWORD;

  constructor() {
    this.empRepo = dataSource.getRepository(Employee);
    this.roleRepo = dataSource.getRepository(Role);
    this.personRepo = dataSource.getRepository(Person);
    this.serviceRepo = dataSource.getRepository(Service);
    this.accessTypeRepo = dataSource.getRepository(AccessType);
    this.scopeRepo = dataSource.getRepository(Scope);
    this.permissionRepo = dataSource.getRepository(Permission);

    this.acList = [
      { name: 'auth', accessType: ['account', 'employee', 'role'] },
      {
        name: 'catalog',
        accessType: [
          'product',
          'sub-category',
          'subcat-attr',
          'brand',
          'product-attr',
          'product-attr-value',
        ],
      },
      { name: 'media', accessType: ['image', 'video'] },
    ];
    this.scopeList = ['create', 'read', 'update', 'delete'];
  }

  public async InitailizeAdminDefaultSetting() {
    await this.createPermission();
    await this.createAdminAccount();
  }

  private async createAdminAccount() {
    const empCount = await this.empRepo.count();
    if (empCount < 1) {
      let person = await this.personRepo.findOne({
        where: { email: this.adminEmail },
      });
      if (!person)
        person = await this.personRepo.save({ email: this.adminEmail });

      const adminRole = await this.createRole();

      await this.empRepo.save({
        password: await argon2.hash(this.adminPwd),
        person,
        isVerified: true,
        roles: [adminRole],
      });
    }
  }

  private async createRole() {
    const isAdmin = await this.roleRepo.findOne({ where: { title: 'admin' } });
    if (isAdmin) return isAdmin;

    return await this.roleRepo.save({ title: 'admin' });
  }

  private async createScope() {
    this.scopeList.map(async (scope: string) => {
      const isScope = await this.scopeRepo.findOne({ where: { title: scope } });
      if (!isScope) await this.scopeRepo.save({ title: scope });
    });

    return await this.scopeRepo.find();
  }

  private async createAccessType() {
    this.acList.map(async (ac) => {
      const isService = await this.serviceRepo.findOne({
        where: { name: ac.name },
      });
      if (!isService) await this.serviceRepo.save({ name: ac.name });
      const service = await this.serviceRepo.findOne({
        where: { name: ac.name },
      });

      ac.accessType.map(async (acType) => {
        const isAccessType = await this.accessTypeRepo.findOne({
          where: { service: { name: ac.name }, title: acType },
        });
        if (!isAccessType)
          await this.accessTypeRepo.save({
            title: acType,
            service: <Service>service,
          });
      });
    });

    return await this.accessTypeRepo.find();
  }

  private async createPermission() {
    const accessTypes: AccessType[] = await this.createAccessType();
    const role: Role = await this.createRole();
    const scopes: Scope[] = await this.createScope();
    accessTypes.map(async (accessType) => {
      scopes.map(async (scope) => {
        const isPermission = await this.permissionRepo.findOne({
          where: { role, accessType, scope },
        });

        if (!isPermission)
          await this.permissionRepo.save({ role, accessType, scope });
      });
    });
  }
}
