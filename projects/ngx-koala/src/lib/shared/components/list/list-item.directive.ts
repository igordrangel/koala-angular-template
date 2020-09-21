import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[itemHost]',
})
export class ListItemDirective {
	constructor(public viewContainerRef: ViewContainerRef) { }
}
