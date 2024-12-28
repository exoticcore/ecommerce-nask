import { UUID } from 'crypto';
import { Employee } from '../emp/emp.entity';

export interface CreateEmployeeSession {
  jti: string | UUID;
  device: string | UUID;
  ip?: string | null;
  userAgent?: string | null;
  timezone?: string | null;
  activeAt: Date;
  employee: Employee;
}
