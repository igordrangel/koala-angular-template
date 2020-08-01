import { Injectable } from '@angular/core';
import { AbstractMultideskApi } from '../../abstract-multidesk-api';
import { MultideskService } from '../../multidesk.service';
import { AuthInterface } from './interfaces/auth.interface';
import { ApiMethodEnum } from '../../enum/api-method.enum';
import { ResponseInterface } from '../../interfaces/service/response.interface';
import { TokenHelper } from '../../helpers/token/token.helper';
import { LoginInterface } from './interfaces/login.interface';
import { BehaviorSubject } from 'rxjs';
import { UserInterface } from './interfaces/user.interface';
import { SingupInterface } from './interfaces/singup.interface';
import { UserActivateInterface } from './interfaces/user-activate.interface';
import { ForgotMyPasswordInterface } from './interfaces/fotgot-my-password.interface';
import { ForgotMyPasswordValidateInterface } from './interfaces/forgot-my-password-validate.interface';
import { ForgotMyPasswordUpdateInterface } from './interfaces/forgot-my-password-update.interface';

@Injectable({providedIn: 'root'})
export class UsuarioService extends AbstractMultideskApi {
  readonly usuarioLogado = new BehaviorSubject<UserInterface | null>(null);

  constructor(multideskService: MultideskService) {
    super(multideskService);
  }

  public auth(credentials: AuthInterface) {
    return new Promise((resolve, reject) => {
      this._multideskService
          .request<ResponseInterface>(ApiMethodEnum.post, 'login', credentials)
          .then((response) => {
            const dados = response.data as LoginInterface;
            TokenHelper.setToken(dados.token);
            resolve(response);
          })
          .catch((error) => reject(error));
    });
  }

  public logout() {
    return new Promise<boolean>((resolve) => {
      TokenHelper.removeToken();
      this.usuarioLogado.next(null);
      resolve(true);
    });
  }

  public singup(data: SingupInterface) {
    return this._multideskService.request<ResponseInterface>(ApiMethodEnum.post, 'usuario', data);
  }

  public activate(data: UserActivateInterface) {
    return this._multideskService.request<ResponseInterface>(ApiMethodEnum.patch, 'usuario/ativar', data);
  }

  public forgotMyPassword(data: ForgotMyPasswordInterface) {
    return this._multideskService.request<ResponseInterface>(ApiMethodEnum.post, 'usuario/esqueci-minha-senha', data);
  }

  public forgotMyPasswordValidate(data: ForgotMyPasswordValidateInterface) {
    return this._multideskService.request<ResponseInterface>(
      ApiMethodEnum.post,
      'usuario/esqueci-minha-senha/validar',
      data,
    );
  }

  public forgotMyPasswordUpdate(data: ForgotMyPasswordUpdateInterface) {
    return this._multideskService.request<ResponseInterface>(
      ApiMethodEnum.patch,
      'usuario/esqueci-minha-senha/alterar',
      data,
    );
  }
}
