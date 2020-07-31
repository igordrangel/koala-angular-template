import { FotgotMyPasswordInterface } from './fotgot-my-password.interface';

export interface ForgotMyPasswordValidateInterface extends FotgotMyPasswordInterface {
  codigo: string;
}
