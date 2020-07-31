/*
 * Public API Surface of ngx-multidesk-service
 */

//#region [CONTROLLERS]
export * from './lib/controllers/multidesk.controller';
//#endregion
//#region [ENUMS]
export * from './lib/enum/api.enum';
export * from './lib/enum/api-method.enum';
//#endregion
//#region [HELPERS]
export * from './lib/helpers/error/client.error';
export * from './lib/helpers/error/errors.helper';
export * from './lib/helpers/error/not-found.error';
export * from './lib/helpers/error/success.error';
export * from './lib/helpers/error/unhautorized.error';
export * from './lib/helpers/service/api.helper';
export * from './lib/helpers/service/request-header.helper';
export * from './lib/helpers/token/token.helper';
//#endregion
//#region [INTERFACES]
export * from './lib/interfaces/service/api.interface';
export * from './lib/interfaces/service/multidesk-response.interface';
export * from './lib/interfaces/service/request.interface';
export * from './lib/interfaces/service/response.interface';
//#endregion
//#region [SERVICES]
//#region [USUARIOS]
export * from './lib/services/usuario/interfaces/auth.interface';
export * from './lib/services/usuario/interfaces/forgot-my-password-update.interface';
export * from './lib/services/usuario/interfaces/forgot-my-password-validate.interface';
export * from './lib/services/usuario/interfaces/fotgot-my-password.interface';
export * from './lib/services/usuario/interfaces/login.interface';
export * from './lib/services/usuario/interfaces/singup.interface';
export * from './lib/services/usuario/interfaces/user.interface';
export * from './lib/services/usuario/interfaces/user-activate.interface';
export * from './lib/services/usuario/user-status.enum';
export * from './lib/services/usuario/usuario.service';
//#endregion
//#endregion

export * from './lib/multidesk.service';
