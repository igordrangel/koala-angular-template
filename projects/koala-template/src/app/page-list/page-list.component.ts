import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ListItemInterface } from '../../../../ngx-koala/src/lib/shared/components/list/list.item.interface';
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

@Component({
  templateUrl: 'page-list.component.html'
})
export class PageListComponent implements OnInit {
  public formData: FormGroup;
  public collumns = ['select', 'name', 'capital', 'region', 'options'];
  public itensList: ListItemInterface[];
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
        label: 'Name',
        columnDef: 'name',
        itemNameProperty: (countrie: CountriesInterface) => countrie.name,
        dblClick: <CountriesInterface>(countrie) => this.dialogList(countrie)
      },
      {
        label: 'Capital',
        columnDef: 'capital',
        itemNameProperty: (countrie: CountriesInterface) => countrie.capital,
        dblClick: <CountriesInterface>(countrie) => this.dialogList(countrie)
      },
      {
        label: 'Region',
        columnDef: 'region',
        itemNameProperty: (countrie: CountriesInterface) => countrie.region,
        dblClick: <CountriesInterface>(countrie) => this.dialogList(countrie)
      }
    ];
    this.itensMenuListOptions = [
      {
        icon: 'edit',
        name: 'Editar',
        action: <CountriesInterface>(countrie) => this.dialogList(countrie),
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
