import { ForgotMyPasswordInterface } from './forgot-my-password.interface';

export interface ForgotMyPasswordValidateInterface extends ForgotMyPasswordInterface {
  codigo: string;
}
