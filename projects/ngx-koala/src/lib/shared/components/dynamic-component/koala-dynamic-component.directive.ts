import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[koalaDynamicComponent]',
})
export class KoalaDynamicComponentDirective {
	constructor(public viewContainerRef: ViewContainerRef) { }
}
