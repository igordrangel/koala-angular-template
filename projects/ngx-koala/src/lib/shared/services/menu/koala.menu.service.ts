import { Injectable } from '@angular/core';
import { menuStateSubject } from '../../components/menu/menu.component';

@Injectable({providedIn: "any"})
export class KoalaMenuService {

	public getMenuState(): 'open' | 'close' {
		return menuStateSubject.getValue();
	}

	public open() {
		menuStateSubject.next('open');
	}

	public close() {
		menuStateSubject.next('close');
	}

	public clearConfig() {
		menuStateSubject.next(null);
	}
}
