import { Repository } from 'typeorm';
import { Employee } from '../../emp/emp.entity';
import argon from 'argon2';
import { dataSource } from '../../../config/typeorm.config';
import { EmployeeSession } from '../../emp-session/emp-session.entity';
import { LoginDTO } from '../dto/auth.dto';
import EmployeeSessionService from '../../emp-session/emp-session.service';
import { Request } from 'express';
import { CreateEmployeeSession } from '../../emp-session/emp-session.interface';
import crypto from 'crypto';
import JwtToken from '../../../utils/jwt-token';
import { IRefreshToken } from './admin.interface';

export default class AdminService {
  private readonly empSessionService: EmployeeSessionService;
  private readonly empRepo: Repository<Employee>;
  private readonly jwtToken: JwtToken;

  constructor() {
    this.empSessionService = new EmployeeSessionService();
    this.empRepo = dataSource.getRepository(Employee);
    this.jwtToken = new JwtToken();
  }

  public async login(loginDTO: LoginDTO, req: Request) {
    const emp = await this.empRepo.findOne({
      where: { person: { email: loginDTO.email } },
      relations: { person: true },
    });
    if (!emp) return null;

    const isValid = await argon.verify(emp.password, loginDTO.password);
    if (!isValid) return null;

    const credential = this.jwtToken.generateRefreshToken(emp);
    const accessToken = this.jwtToken.generateAccessToken(emp);

    const newSession: CreateEmployeeSession = {
      jti: credential.jti,
      ip: req.ip,
      device: req.cookies.dvad || crypto.randomUUID(),
      activeAt: new Date(),
      employee: emp,
    };
    await this.empSessionService.createEmployeeSession(newSession);

    return {
      refreshToken: credential.refreshToken,
      accessToken,
      dvid: newSession.device,
    };
  }

  public async refreshToken(sessionInfo: IRefreshToken, req: Request) {
    const session = await this.empSessionService.getEmployeeSession(
      sessionInfo.jti
    );
    if (!session || session.revoked || session.maxAge < new Date(Date.now()))
      return null;

    const revoked = await this.empSessionService.revokeEmployeeSession(
      session.refreshToken
    );
    if (!revoked) return null;

    const credential = this.jwtToken.generateRefreshToken(session.employee);
    const newSession: CreateEmployeeSession = {
      jti: credential.jti,
      ip: req.ip,
      device: req.cookies.dvad || crypto.randomUUID(),
      activeAt: new Date(),
      employee: session.employee,
    };
    await this.empSessionService.createEmployeeSession(newSession);

    return { refreshToken: credential.refreshToken, dvid: newSession.device };
  }

  public async accessToken(sessionInfo: IRefreshToken) {
    const session = await this.empSessionService.getEmployeeSession(
      sessionInfo.jti
    );
    if (!session || session.revoked || session.maxAge < new Date(Date.now()))
      return null;

    const roles: string[] = [];

    session.employee.roles.map((role) => {
      roles.push(role.title);
    });

    const accessToken = this.jwtToken.generateAccessToken(
      session.employee,
      roles
    );

    return { accessToken };
  }

  public async logout(sessionInfo: IRefreshToken) {
    const revoked = await this.empSessionService.revokeEmployeeSession(
      sessionInfo.jti
    );

    return revoked;
  }
}
