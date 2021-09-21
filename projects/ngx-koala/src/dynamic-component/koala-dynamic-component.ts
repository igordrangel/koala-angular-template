import { Type } from '@angular/core';

export class KoalaDynamicComponent {
	constructor(public component: Type<any>, public data?: any) {}
}
