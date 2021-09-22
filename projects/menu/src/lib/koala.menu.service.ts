import { Injectable } from '@angular/core';
import { menuStateSubject, MenuStateType } from './menu.component';

@Injectable({providedIn: "any"})
export class KoalaMenuService {

	public getMenuState(): MenuStateType | null {
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
