import { Component, Input } from '@angular/core';
import { CountriesInterface } from '../countries.interface';
import { KoalaListItemComponent } from '../../../../../ngx-koala/src/lib/shared/components/list/koala-list-item.component';

@Component({
	templateUrl: 'country-component.html'
})
export class CountryComponent implements KoalaListItemComponent {
	@Input() data: CountriesInterface;
}
