import { Observable } from 'rxjs';

export interface VerifyAdminService {
  verify(params: { token: string }): Observable<any>;
}
