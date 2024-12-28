import { Repository } from 'typeorm';
import { Employee } from '../api/emp/emp.entity';
import { dataSource } from '../config/typeorm.config';
import JwtToken from './jwt-token';
import { Person } from '../api/person/person.entity';
import { Role } from '../database/role.entity';
import { Permission } from '../database/permission.entity';
import { Service } from '../database/service.entity';
import { AccessType } from '../database/access-type.entity';

export default class AccessAdmin {
  private readonly employeeRepo: Repository<Employee>;
  private readonly personRepo: Repository<Person>;
  private readonly roleRepo: Repository<Role>;
  private readonly permissionRepo: Repository<Permission>;
  private readonly accessTypeRepo: Repository<AccessType>;

  private readonly jwtToken = new JwtToken();

  constructor() {
    this.employeeRepo = dataSource.getRepository(Employee);
    this.personRepo = dataSource.getRepository(Person);
    this.roleRepo = dataSource.getRepository(Role);
    this.permissionRepo = dataSource.getRepository(Permission);
    this.accessTypeRepo = dataSource.getRepository(AccessType);
  }

  public async verifyAccess(accessToken: string, accessType?: string[]) {
    const { error, tokenInfo } = this.jwtToken.verifyAccessToken(accessToken);

    if (error || !tokenInfo) return null;

    const person = await this.personRepo.findOneBy({ email: tokenInfo.email });
    if (!person) return null;

    const employee = await this.employeeRepo.findOne({
      where: {
        person: {
          email: person.email,
        },
      },
      relations: ['roles'],
    });
    if (!employee || employee.roles.length < 1) return null;

    const roles = [];
    const permissions = [];

    for (let x = 0; x <= employee.roles.length; x++) {
      if (employee.roles[x]) {
        const isPermissions = await this.permissionRepo.find({
          where: { role: employee.roles[x] },
          relations: { accessType: { service: true }, scope: true },
        });
        if (isPermissions.length) {
          for (let y = 0; y <= isPermissions.length; y++) {
            if (isPermissions[y]) {
              const permission = `${isPermissions[y].accessType.service.name}.${isPermissions[y].accessType.title}.${isPermissions[y].scope.title}`;
              permissions.push(permission);
            }
          }
        }
        roles.push(employee.roles[x].title);
      }
    }

    if (accessType?.length) {
      const regex = /^[^.]+\.[^.]+\.[^.]+$/;
      for (let i = 0; i <= accessType.length; i++) {}
    } else {
      const result = {
        id: employee.id,
        email: person.email,
        firstName: person.firstName,
        lastName: person.lastName,
        roles,
        permissions,
      };

      return result;
    }
  }
}
