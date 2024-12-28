import { User } from '../../database/user.entity';
import PersonService from '@api/person/person.service';
import { logger } from '@/utils/logger';
import { LoginDTO, SetPasswordDTO, VerifyDTO } from '@api/auth/dto/auth.dto';
import { ActiveEmailService } from './auth.interface';
import { Person } from '@api/person/person.entity';
import UserService from '@api/user/user.service';
import argon2 from 'argon2';
import SendMail from '../../utils/nodemailer';
import crypto from 'crypto';
import redis from '../../config/redis.config';
import { dataSource } from '../../config/typeorm.config';
import JwtToken from '../../utils/jwt-token';
import { UserSession } from '../user-session/user-session.entity';
import UserSessionService from '../user-session/user-session.service';
import { CreateUserSession } from '../user-session/user-session.interface';

export default class AuthService {
  private personService: PersonService;
  private userService: UserService;
  private userSessionService: UserSessionService;
  private sendMail: SendMail;
  private JwtToken: JwtToken;

  constructor() {
    this.personService = new PersonService();
    this.userService = new UserService();
    this.userSessionService = new UserSessionService();
    this.sendMail = new SendMail();
    this.JwtToken = new JwtToken();
  }

  public async activeEmail(email: string): Promise<ActiveEmailService> {
    const person: Person | null = await this.personService.getPersonByEmail(
      email
    );
    if (person) {
      const user: User | null = await this.userService.getUserByPerson(person);
      if (user && !user.blocked && user.isVerified && user.password) {
        return { sentEmail: false };
      }
      if (user?.blocked) return { sentEmail: false, blocked: true };
    }

    const token = crypto.randomBytes(64).toString('hex');

    let verifyField = {
      token,
      expiredAt: Date.now() + 15 * 60 * 1000,
      count: 1,
    };

    const verifyValue = await redis.get(email);

    if (verifyValue) {
      const verifyRedis = JSON.parse(verifyValue);
      await redis.del(verifyRedis.token);
      verifyField.count = verifyRedis.count + 1;
      if (verifyField.count > 5)
        return { sentEmail: false, count: verifyField.count };
    }

    await redis.set(token, email);
    await redis.set(email, JSON.stringify(verifyField));

    const receiver = await this.sendMail.sendMail(email, token);

    logger.info(`sent an email to ${receiver}`);
    console.log({ token });
    return { sentEmail: true, count: verifyField.count };
  }

  public async verify(verifyDto: VerifyDTO) {
    const email = await redis.get(verifyDto.token);
    if (!email) return null;

    const verifyRedis = await redis.get(email);
    if (!verifyRedis) return null;

    const verifyField = JSON.parse(verifyRedis);
    if (!verifyField.expiredAt || verifyField.expiredAt < Date.now())
      return null;

    let person = await this.personService.getPersonByEmail(email);
    if (!person) person = await this.personService.createPerson({ email });

    let user = await this.userService.getUserByPerson(person);
    if (!user) user = await this.userService.createUser({ person });

    const session = this.JwtToken.generateRefreshToken(user);
    const accessToken = this.JwtToken.generateAccessToken(user);

    const verifyUser = await this.userService.verifyUser(user.person.email);

    const newSession: CreateUserSession = {
      refreshToken: session.jti,
      device: verifyDto.device || crypto.randomUUID(),
      ip: verifyDto.ip || null,
      userAgent: verifyDto.userAgent,
      activeAt: new Date(Date.now()),
      timezone: verifyDto.timezone,
      user: user,
    };

    if (verifyDto.device)
      await this.userSessionService.revokeUserSession(verifyDto.device);

    await this.userSessionService.createNewUserSession(newSession);

    await redis.del(verifyUser.person.email);
    await redis.del(verifyDto.token);

    return {
      refreshToken: session.refreshToken,
      accessToken,
      dvid: newSession.device,
    };
  }

  public async accessToken(jti: string, email: string) {
    const isToken = await dataSource.getRepository(UserSession).findOne({
      where: { refreshToken: jti, revoked: false },
      relations: { user: { person: true } },
    });
    if (!isToken || isToken.revoked) return null;

    const accessToken = this.JwtToken.generateAccessToken(isToken.user);

    return { accessToken };
  }

  public async refreshToken() {
    const oldSession = await this.userSessionService.getUserSessionByJti('jti');
    if (!oldSession || oldSession.revoked) return null;

    await dataSource
      .getRepository(UserSession)
      .save({ ...oldSession, revoked: true });

    const user = await this.userService.getUserByEmail('');
    if (!user) return null;

    const newSession = this.JwtToken.generateRefreshToken(user);

    return { refreshToken: newSession.refreshToken };
  }

  public async setPassword(setPwdDTO: SetPasswordDTO) {
    let user = await this.userService.getUserByEmail(setPwdDTO.email);
    if (!user || user.password) return null;

    user.password = await argon2.hash(setPwdDTO.password);

    await dataSource.getRepository(User).save(user);

    return true;
  }

  public async login(loginDTO: LoginDTO): Promise<User | null> {
    const person: Person | null = await this.personService.getPersonByEmail(
      loginDTO.email
    );
    if (!person) return null;

    const user: User | null = await this.userService.getUserByPerson(person);
    if (!user || user.blocked || !user.isVerified || !user.password)
      return null;

    const isValidPassword: boolean = await argon2.verify(
      user.password,
      loginDTO.password
    );
    if (!isValidPassword) return null;

    return user;
  }

  public async googleLogin(profile: any) {
    const isUser = await this.userService.getUserByEmail(
      profile.emails[0].value
    );

    if (!isUser) {
      const person = await this.personService.createPerson({
        email: profile.emails[0].value,
      });

      await this.userService.createUser({ person });
    }
  }
}
