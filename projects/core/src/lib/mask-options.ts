import { IConfig } from 'ngx-mask';

export const maskOptions: Partial<IConfig> | (() => Partial<IConfig>) = {
	validation: false
};
