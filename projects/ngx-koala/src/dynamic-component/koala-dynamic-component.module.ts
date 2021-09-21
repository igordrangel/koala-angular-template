import { NgModule } from '@angular/core';
import { KoalaDynamicComponentDirective } from './koala-dynamic-component.directive';
import { KoalaDynamicComponentFactory } from './koala-dynamic-component.factory';

@NgModule({
	exports: [
		KoalaDynamicComponentFactory
	],
	declarations: [
		KoalaDynamicComponentDirective,
		KoalaDynamicComponentFactory
	]
})
export class KoalaDynamicComponentModule {
}
