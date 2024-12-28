import { DataSource, Repository } from 'typeorm';
import { dataSource } from '../../config/typeorm.config';
import { UserSession } from './user-session.entity';
import { CreateUserSession } from './user-session.interface';

export default class UserSessionService {
  private readonly userSessionRepo: Repository<UserSession>;

  constructor() {
    this.userSessionRepo = dataSource.getRepository(UserSession);
  }

  public async getUserSessionByJti(jti: string) {
    const userSession = await this.userSessionRepo.findOne({
      where: { refreshToken: jti },
      relations: { user: { person: true } },
    });

    return userSession;
  }

  public async revokeUserSession(dvid: string) {
    const session = await this.getUserSessionByJti(dvid);
    if (session)
      return await this.userSessionRepo.save({ ...session, revoked: true });

    return null;
  }

  public async getUserSessionByDevice(dvid: string) {
    return await this.userSessionRepo.findOne({ where: { device: dvid } });
  }

  public async createNewUserSession(userSessionDto: CreateUserSession) {
    const pastSession = await this.userSessionRepo.findOne({
      where: { device: userSessionDto.device, revoked: false },
    });

    if (pastSession)
      await this.userSessionRepo.save({ ...pastSession, revoked: true });

    return await this.userSessionRepo.save({ ...userSessionDto });
  }
}
