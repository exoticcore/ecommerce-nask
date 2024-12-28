import { Repository } from 'typeorm';
import { EmployeeSession } from './emp-session.entity';
import { dataSource } from '../../config/typeorm.config';
import { CreateEmployeeSession } from './emp-session.interface';

export default class EmployeeSessionService {
  private readonly empSessionRepo: Repository<EmployeeSession>;

  constructor() {
    this.empSessionRepo = dataSource.getRepository(EmployeeSession);
  }

  public async createEmployeeSession(
    createEmployeeSession: CreateEmployeeSession
  ) {
    const isSession = await this.empSessionRepo.findOne({
      where: {
        revoked: false,
        employee: {
          person: { email: createEmployeeSession.employee.person.email },
        },
      },
    });
    if (isSession)
      await this.empSessionRepo.save({ ...isSession, revoked: true });

    return await this.empSessionRepo.save({
      ...createEmployeeSession,
      refreshToken: createEmployeeSession.jti,
      maxAge: new Date(Date.now() + 12 * 60 * 60 * 1000),
    });
  }

  public async getEmployeeSession(jti: string) {
    return await this.empSessionRepo.findOne({
      where: { refreshToken: jti },
      relations: { employee: { person: true, roles: true } },
    });
  }

  public async revokeEmployeeSession(jti: string) {
    const isSession = await this.getEmployeeSession(jti);
    if (!isSession) return null;

    return await this.empSessionRepo.save({
      ...isSession,
      revoked: true,
    });
  }
}
