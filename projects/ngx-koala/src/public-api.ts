/*
 * Public API Surface of ngx-koala
 */

//#region [KOALA PAGE]
export * from './lib/shared/components/page/page.component';
//#endregion

//#region [KOALA FORM]
export * from './lib/shared/components/form/show-invalid-fields/show-invalid-fields';
export * from './lib/shared/components/form/btn-submit/btn-submit.component.js';
export * from './lib/shared/components/form/dynamic-form/enums/dynamic-form-type-field.enum';
export * from './lib/shared/components/form/dynamic-form/validators/validation.helper';
export * from './lib/shared/components/form/dynamic-form/validators/cpf.validator';
export * from './lib/shared/components/form/dynamic-form/validators/cnpj.validator';
export * from './lib/shared/components/form/dynamic-form/validators/autocomplete-selected.validator';
export * from './lib/shared/components/form/dynamic-form/interfaces/dynamic-form-field.interface';
export * from './lib/shared/components/form/dynamic-form/dynamic-form.component';
export * from './lib/shared/components/form/koala.form.module';
//#endregion

export * from './lib/core/form.abstract';
export * from './lib/mask-options';
export * from './lib/ngx-koala.module';
