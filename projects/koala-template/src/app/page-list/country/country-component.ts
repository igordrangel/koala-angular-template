import { Component, Input } from '@angular/core';
import { CountriesInterface } from '../countries.interface';
import { KoalaDynamicComponentComponent } from '../../../../../ngx-koala/src/lib/shared/components/dynamic-component/koala-dynamic-component.component';

@Component({
	templateUrl: 'country-component.html'
})
export class CountryComponent implements KoalaDynamicComponentComponent {
	@Input() data: CountriesInterface;
}
