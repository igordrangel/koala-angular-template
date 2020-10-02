import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { KoalaDynamicComponent } from './koala-dynamic-component';
import { KoalaDynamicComponentDirective } from './koala-dynamic-component.directive';
import { KoalaDynamicComponentComponent } from './koala-dynamic-component.component';

@Component({
	selector: 'koala-dynamic-component',
	template: `
		<ng-template koalaDynamicComponent></ng-template>`
})
export class KoalaDynamicComponentFactory implements OnInit {
	@Input() dynamicComponent: KoalaDynamicComponent;
	@ViewChild(KoalaDynamicComponentDirective, {static: true}) koalaDynamicComponentDirective: KoalaDynamicComponentDirective;
	
	constructor(private componentFactoryResolver: ComponentFactoryResolver) { }
	
	ngOnInit() {
		this.loadComponent();
	}
	
	loadComponent() {
		const dynamicComponent = this.dynamicComponent;
		
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(dynamicComponent.component);
		
		const viewContainerRef = this.koalaDynamicComponentDirective.viewContainerRef;
		viewContainerRef.clear();
		
		const componentRef = viewContainerRef.createComponent<KoalaDynamicComponentComponent>(componentFactory);
		componentRef.instance.data = dynamicComponent.data;
	}
	
}
