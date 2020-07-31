import { ForgotMyPasswordValidateInterface } from './forgot-my-password-validate.interface';

export interface ForgotMyPasswordUpdateInterface extends ForgotMyPasswordValidateInterface {
  senha: string;
  confSenha: string;
}
