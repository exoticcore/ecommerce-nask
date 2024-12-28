export interface ActiveEmailService {
  sentEmail: boolean;
  verified?: boolean;
  blocked?: boolean;
  count?: number;
}
