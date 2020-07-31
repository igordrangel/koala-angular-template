/*
 * Public API Surface of ngx-koala
 */

//#region [COMPONENTS]

//#region [KOALA ALERT]
export * from './lib/shared/components/alert/dialog-alert.component';
export * from './lib/shared/components/alert/koala.alert-config.interface';
export * from './lib/shared/components/alert/koala.alert.enum';
export * from './lib/shared/components/alert/koala.request-code-to-alert-enum.translate';
export * from './lib/shared/components/alert/koala.alert.module';
//#endregion

//#region [KOALA BUTTON]
export * from './lib/shared/components/button/button.component';
export * from './lib/shared/components/button/koala.button.module';
//#endregion

//#region [KOALA DIALOG]
export * from './lib/shared/components/dialog/dialog.component';
export * from './lib/shared/components/dialog/koala.dialog.module';
//#endregion

//#region [KOALA FORM]
export * from './lib/shared/components/form/btn-submit/btn-submit.component.js';
export * from './lib/shared/components/form/dynamic-form/enums/dynamic-form-type-field.enum';
export * from './lib/shared/components/form/dynamic-form/interfaces/dynamic-form-field.interface';
export * from './lib/shared/components/form/dynamic-form/validators/validation.helper';
export * from './lib/shared/components/form/dynamic-form/validators/cpf.validator';
export * from './lib/shared/components/form/dynamic-form/validators/cnpj.validator';
export * from './lib/shared/components/form/dynamic-form/validators/autocomplete-selected.validator';
export * from './lib/shared/components/form/dynamic-form/dynamic-form.component';
export * from './lib/shared/components/form/show-invalid-fields/show-invalid-fields';
export * from './lib/shared/components/form/koala.form.module';
//#endregion

//#region [KOALA LIST]
export * from './lib/shared/components/list/list.abstract';
export * from './lib/shared/components/list/list.component';
export * from './lib/shared/components/list/list.filter.interface';
export * from './lib/shared/components/list/list.form-filter.interface';
export * from './lib/shared/components/list/list.item.interface';
export * from './lib/shared/components/list/list.item-menu-option.interface';
export * from './lib/shared/components/list/list.module';
//#endregion

//#region [KOALA LOADER]
export * from './lib/shared/components/loader/loader-bar-page.component';
export * from './lib/shared/components/loader/loader-bar-page.interface';
export * from './lib/shared/components/loader/loader-config.interface';
//#endregionexport * from './lib/shared/components/loader/loader-bar-page.component';

//#region [KOALA MENU]
export * from './lib/shared/components/menu/koala.menu.module';
export * from './lib/shared/components/menu/koala.menu-module.interface';
export * from './lib/shared/components/menu/koala.menu-tool.interface';
export * from './lib/shared/components/menu/menu.component';
//#endregion

//#region [KOALA NOTIFICATION]
export * from './lib/shared/components/notifications/koala.notification.interface';
export * from './lib/shared/components/notifications/notification.component';
//#endregion

//#region [KOALA PAGE]
export * from './lib/shared/components/page/koala.user-menu-options.interface';
export * from './lib/shared/components/page/page.component';
//#endregion

//#region [KOALA QUESTION]
export * from './lib/shared/components/question/dialog-question.component';
export * from './lib/shared/components/question/koala.question.module';
//#endregion

//#endregion

//#region [PROVIDERS]
export * from './lib/shared/providers/pagination/pagination.provider';
//#endregion

//#region [SERVICES]

//#region [KOALA ALERT]
export * from './lib/shared/services/alert/koala.alert.service';
//#endregion

//#region [KOALA CSV]
export * from './lib/shared/services/csv/koala.csv.service';
//#endregion

//#region [KOALA DIALOG]
export * from './lib/shared/services/dialog/koala.dialog.service';
export * from './lib/shared/services/dialog/koala.dialog-template.interface';
//#endregion

//#region [KOALA DYNAMIC FORMS]
export * from './lib/shared/services/dynamic-forms/koala.dynamic-form.service';
//#endregion

//#region [KOALA LOADER]
export * from './lib/shared/services/loader/koala.loader.service';
//#endregion

//#region [KOALA QUESTION]
export * from './lib/shared/services/question/koala.question.service';
//#endregion

//#region [KOALA REQUEST]
export * from './lib/shared/services/request/koala.request.service';
//#endregion

//#region [KOALA TOKEN]
export * from './lib/shared/services/token/koala.token.service';
//#endregion

//#region [KOALA VIACEP]
export * from './lib/shared/services/viacep/viacep.interface';
export * from './lib/shared/services/viacep/viacep.service';
//#endregion

//#endregion

export * from './lib/shared/providers/pagination/pagination.provider';
export * from './lib/core/form.abstract';
export * from './lib/mask-options';
export * from './lib/ngx-koala.module';
