import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { ListItemDirective } from './list-item.directive';
import { KoalaListItemComponent } from './koala-list-item.component';
import { KoalaListItem } from './koala-list-item';

@Component({
	selector: 'koala-list-item',
	template: `
		<ng-template itemHost></ng-template>`
})
export class ListItemFactory implements OnInit {
	@Input() itemList: KoalaListItem;
	@ViewChild(ListItemDirective, {static: true}) itemHost: ListItemDirective;
	
	constructor(private componentFactoryResolver: ComponentFactoryResolver) { }
	
	ngOnInit() {
		this.loadComponent();
	}
	
	loadComponent() {
		const item = this.itemList;
		
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(item.component);
		
		const viewContainerRef = this.itemHost.viewContainerRef;
		viewContainerRef.clear();
		
		const componentRef = viewContainerRef.createComponent<KoalaListItemComponent>(componentFactory);
		componentRef.instance.data = item.data;
	}
}
