import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { KoalaDynamicFormFieldInterface } from '../../../../ngx-koala/src/lib/shared/components/form/dynamic-form/interfaces/koala.dynamic-form-field.interface';
import { DynamicFormTypeFieldEnum } from '../../../../ngx-koala/src/lib/shared/components/form/dynamic-form/enums/dynamic-form-type-field.enum';
import { KoalaDynamicFormService } from '../../../../ngx-koala/src/lib/shared/services/dynamic-forms/koala.dynamic-form.service';
import { BehaviorSubject } from 'rxjs';
import { KoalaDynamicSetValueInterface } from '../../../../ngx-koala/src/lib/shared/components/form/dynamic-form/interfaces/koala.dynamic-set-value.interface';
import { KoalaDynamicAutocompleteOptionsInterface } from '../../../../ngx-koala/src/lib/shared/components/form/dynamic-form/interfaces/koala.dynamic-autocomplete-options.interface';
import { PageListService } from '../page-list/page-list.service';

@Component({
	templateUrl: 'page-forms.component.html',
	styleUrls: ['page-forms.component.css']
})
export class PageFormsComponent implements OnInit {
	public formLocation: FormGroup;
	
	public formMoreItens: FormGroup;
	public formMoreItensConfig: KoalaDynamicFormFieldInterface[];
	public formMoreItensValuesSubject = new BehaviorSubject<BehaviorSubject<KoalaDynamicSetValueInterface[]>[]>([]);
	
	public formAutocomplete: FormGroup;
	public formAutocompleteConfig: KoalaDynamicFormFieldInterface[];
	public countriesSubject = new BehaviorSubject<KoalaDynamicAutocompleteOptionsInterface[]>([]);
	
	constructor(
		private fb: FormBuilder,
		private dynamicFormService: KoalaDynamicFormService,
		private countryService: PageListService
	) {}
	
	ngOnInit(): void {
		this.formLocation = this.fb.group({});
		this.formMoreItens = this.fb.group({});
		this.formMoreItensConfig = [{
			label: 'Itens por Demanda',
			name: 'itensPorDemanda',
			type: DynamicFormTypeFieldEnum.moreItems,
			moreItemsButtonIconAddlabel: 'Adicionar novo item',
			moreItemsIcon: 'receipt_long',
			moreItemsMinItems: 1,
			moreItemsMaxItems: 2,
			moreItemsConfig: {
				form: this.fb.group({}),
				setValues: this.formMoreItensValuesSubject,
					formConfig: [
						{
							label: 'Nome',
							name: 'name',
							type: DynamicFormTypeFieldEnum.text,
							appearance: 'fill',
							floatLabel: 'always',
							class: 'col-6',
							fieldClass: 'w-100'
						},
						{
							label: 'Sobrenome',
							name: 'lastname',
							type: DynamicFormTypeFieldEnum.text,
							appearance: 'fill',
							floatLabel: 'always',
							class: 'col-6',
							fieldClass: 'w-100'
						}
					]
			}
		}];
		
		this.formAutocomplete = this.fb.group({});
		this.formAutocompleteConfig = [{
			label: 'Country (All)',
			name: 'country',
			type: DynamicFormTypeFieldEnum.autocomplete,
			floatLabel: 'always',
			appearance: 'fill',
			class: 'col-12',
			fieldClass: 'w-100',
			autocompleteOptions: this.countriesSubject,
			autocompleteType: 'all'
		}, {
			label: 'Country (On Demand)',
			name: 'country',
			type: DynamicFormTypeFieldEnum.autocomplete,
			floatLabel: 'always',
			appearance: 'fill',
			class: 'col-12',
			fieldClass: 'w-100',
			autocompleteFilter: (filter) => this.dynamicFormService.autocompleteFilterOnServer(() => {
				return new Promise<any[]>(resolve => {
					this.countryService.get({name: filter}).subscribe(countries => resolve(countries));
				});
			}, {
				propsByName: ['name', 'region'],
				delimiter: ' - '
			}),
			autocompleteType: 'onDemand'
		}];
		this.countryService.get().subscribe(countries => {
			const options: KoalaDynamicAutocompleteOptionsInterface[] = [];
			countries.forEach(country => {
				options.push({
					name: country.name,
					value: country
				});
			});
			this.countriesSubject.next(options);
		});
	}
	
	public simulateDataFromServer() {
		this.dynamicFormService.setValuesInMoreItemsForm(this.formMoreItensValuesSubject, [
			[
				{name: 'name', value: 'Nome 1'},
				{name: 'lastname', value: 'Sobrenome 1'}
			], [
				{name: 'name', value: 'Nome 2'},
				{name: 'lastname', value: 'Sobrenome 2'}
			]
		]);
	}
	
	public sendToConsole() {
		console.log('----- MORE ITENS -----');
		console.log(this.dynamicFormService.emitData(this.formMoreItens));
		console.log('----- AUTOCOMPLETE -----');
		console.log(this.dynamicFormService.emitData(this.formAutocomplete));
	}
}
