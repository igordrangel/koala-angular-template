import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class KoalaMenuService {
	private storageMenuState = 'koalaStorageMenuState';
	
	public getMenuState(): 'open' | 'close' {
		return localStorage.getItem(this.storageMenuState) as 'open' | 'close';
	}
	
	public open() {
		localStorage.setItem(this.storageMenuState, 'open');
	}
	
	public close() {
		localStorage.setItem(this.storageMenuState, 'close');
	}
}
