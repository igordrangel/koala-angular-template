import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageListService } from './page-list.service';
import { CountriesInterface } from './countries.interface';
import { ListItemMenuOptionInterface } from '../../../../ngx-koala/src/lib/shared/components/list/list.item-menu-option.interface';
import { ListFilterInterface } from '../../../../ngx-koala/src/lib/shared/components/list/list.filter.interface';
import { DynamicFormTypeFieldEnum } from '../../../../ngx-koala/src/lib/shared/components/form/dynamic-form/enums/dynamic-form-type-field.enum';
import { BehaviorSubject } from 'rxjs';
import { ListFormFilterInterface } from '../../../../ngx-koala/src/lib/shared/components/list/list.form-filter.interface';
import { KoalaDialogService } from '../../../../ngx-koala/src/lib/shared/services/dialog/koala.dialog.service';
import { DialogPageListComponent } from './forms/insert/dialog-page-list.component';
import { SelectionModel } from '@angular/cdk/collections';
import { KoalaCsvService } from '../../../../ngx-koala/src/lib/shared/services/csv/koala.csv.service';
import { KoalaQuestionService } from '../../../../ngx-koala/src/lib/shared/services/question/koala.question.service';
import { KoalaLoaderService } from '../../../../ngx-koala/src/lib/shared/services/loader/koala.loader.service';
import { KoalaAlertService } from '../../../../ngx-koala/src/lib/shared/services/alert/koala.alert.service';
import { KoalaAlertEnum } from '../../../../ngx-koala/src/lib/shared/components/alert/koala.alert.enum';
import { CountryComponent } from './country/country-component';
import { KoalaListItem } from '../../../../ngx-koala/src/lib/shared/components/list/koala-list-item';
import { KoalaListItemInterface } from '../../../../ngx-koala/src/lib/shared/components/list/koala-list.item.interface';

@Component({
  templateUrl: 'page-list.component.html'
})
export class PageListComponent implements OnInit {
  public formData: FormGroup;
  public collumns = ['select', 'country', 'options'];
  public itensList: KoalaListItemInterface[];
  public itensMenuListOptions: ListItemMenuOptionInterface[];
  public filterConfig: ListFilterInterface;
  public filter = new BehaviorSubject<ListFormFilterInterface>(null);
  public selection: SelectionModel<object>;
  public countries: CountriesInterface[];
  
  constructor(
    private fb: FormBuilder,
    private pageListService: PageListService,
    private dialogService: KoalaDialogService,
    private questionService: KoalaQuestionService,
    private loaderService: KoalaLoaderService,
    private alertService: KoalaAlertService,
    private csvService: KoalaCsvService
  ) {
    this.itensList = [
      {
        label: 'Country',
        columnDef: 'country',
        itemComponent: (country: CountriesInterface) => new KoalaListItem(CountryComponent, country),
        dblClick: <CountriesInterface>(country) => this.dialogList(country)
      }
    ];
    this.itensMenuListOptions = [
      {
        icon: 'edit',
        name: 'Editar',
        action: <CountriesInterface>(country) => this.dialogList(country),
        havePermission: true
      }
    ]
    this.filterConfig = {
      main: [
        {label: 'Name', name: 'name', type: DynamicFormTypeFieldEnum.text, appearance: 'outline'},
        {label: 'Capital', name: 'capital', type: DynamicFormTypeFieldEnum.text, appearance: 'outline'}
      ],
      advanced: [
        {label: 'Region', name: 'region', type: DynamicFormTypeFieldEnum.text, appearance: 'outline'}
      ],
      checkAndSearch: {
        formControlName: 'trash',
        label: 'Lixeira'
      }
    }
  }

  ngOnInit() {
    this.formData = this.fb.group({});
  }

  public buscar() {
    const filter = this.filter?.value;
    return this.pageListService.get(filter?.params);
  }

  public dialogList(countrie?: CountriesInterface) {
    this.dialogService.open(
      DialogPageListComponent,
      'small',
      countrie,
      'reloadList',
      () => this.buscar()
    );
  }

  public actionList() {
    this.questionService.open("Você realmente deseja excluir os itens selecionados?", () => {
      this.loaderService.create({typeLoader: 'indeterminate'});
      console.log(this.selection?.selected);
      setTimeout(() => {
        this.selection?.clear();
        this.loaderService.dismiss();
        this.alertService.create({
          alertEnum: KoalaAlertEnum.success,
          message: 'Itens excluídos com sucesso!'
        });
      }, 2000);
    });
  }

  public downloadList() {
    this.csvService.convertJsonToCsv(
      this.countries,
      'countries'
    )
  }
}
