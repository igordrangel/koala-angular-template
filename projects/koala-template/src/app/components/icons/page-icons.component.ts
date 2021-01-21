import { Component, OnInit } from "@angular/core";
import { PageAbstract } from "../../shared/abstract/page.abstract";
import { BehaviorSubject } from "rxjs";
import { FormBuilder, FormGroup } from "@angular/forms";
import { KoalaDynamicFormFieldInterface } from "../../../../../ngx-koala/src/lib/shared/components/form/dynamic-form/interfaces/koala.dynamic-form-field.interface";
import { DynamicFormTypeFieldEnum } from "../../../../../ngx-koala/src/lib/shared/components/form/dynamic-form/enums/dynamic-form-type-field.enum";
import { koala } from "koala-utils";
import { KlDelay } from "koala-utils/dist/utils/KlDelay";

interface Icon {
  name: string;
  color: string;
  selected: boolean;
}

interface GroupIcon {
  title: string;
  icons: Icon[];
}

@Component({
  templateUrl: 'page-icons.component.html',
  styleUrls: ['page-icons.component.css']
})
export class PageIconsComponent extends PageAbstract implements OnInit {
  public groups: GroupIcon[] = [{
    title: 'Data',
    icons: [{
      name: 'excel',
      color: '#2E7D32',
      selected: false
    }, {
      name: 'word',
      color: '#1976D2',
      selected: false
    }, {
      name: 'pdf',
      color: '#fff',
      selected: false
    }]},{
    title: 'Social Media',
    icons: [{
      name: 'github',
      color: '#fff',
      selected: false
    }]}, {
    title: 'Action',
    icons: [{
      name: 'edit',
      color: '#fff',
      selected: false
    },{
      name: 'trash',
      color: '#fff',
      selected: false
    }]}, {
    title: 'Page',
    icons: [{
      name: 'empty',
      color: '#fff',
      selected: false
    },{
      name: 'notFound',
      color: '#fff',
      selected: false
    },{
      name: 'notAllowed',
      color: '#fff',
      selected: false
    },{
      name: 'sessionExpired',
      color: '#fff',
      selected: false
    }]}, {
    title: 'Others',
    icons: [{
      name: 'webComponents',
      color: '#fff',
      selected: false
    },{
      name: 'deliveryBox',
      color: '#fff',
      selected: false
    }]}
  ];
  public groups$ = new BehaviorSubject<GroupIcon[]>([]);
  public selectedIcon$ = new BehaviorSubject<Icon>(null);

  public formFilter: FormGroup;
  public formFilterConfig: KoalaDynamicFormFieldInterface[];

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.formFilter = this.fb.group({});
    this.formFilterConfig = [{
      label: 'Filter by name',
      name: 'filter',
      type: DynamicFormTypeFieldEnum.text,
      fieldClass: 'w-100',
      appearance: "outline",
      valueChanges: filter => {
        this.groups$.next(koala(JSON.parse(JSON.stringify(this.groups)))
          .array<GroupIcon>()
          .map(group => {
            group.icons = koala(group.icons).array<Icon>().filter(filter, 'name').getValue();
            return group;
          })
          .getValue()
        )
      }
    }];
    this.groups$.next(this.groups);
  }

  public async selectIcon(icon: Icon) {
    koala(this.groups$.getValue())
      .array<GroupIcon>()
      .map(group => {
        group.icons.map(item => {
          item.selected = item.name === icon.name;
          return item;
        });
        return group;
      })
    const elMenuUsage = document.querySelector('.menu__usage') as HTMLDivElement;
    if (elMenuUsage) {
      elMenuUsage.classList.add('hide');
      await KlDelay.waitFor(250);
    }
    this.selectedIcon$.next(null);
    setTimeout(() => this.selectedIcon$.next(icon), 1);
  }
}
