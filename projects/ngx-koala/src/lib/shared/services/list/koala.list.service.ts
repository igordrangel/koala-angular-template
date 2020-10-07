import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class KoalaListService {
	
	public createListRequest(request: () => Observable<any>) {
		return new Observable(observe => {
			request().subscribe(
				(response) => observe.next(response),
				(e) => observe.error(e)
			);
		});
	}
}
