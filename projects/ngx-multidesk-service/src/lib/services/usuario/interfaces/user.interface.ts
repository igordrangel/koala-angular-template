import { UserStatusEnum } from '../user-status.enum';

export interface UserInterface {
  id: number;
  login: string;
  usuario: string;
  nome: string;
  email: string;
  status: UserStatusEnum;
  sessionId: string;
  sessionValidate: Date;
}
