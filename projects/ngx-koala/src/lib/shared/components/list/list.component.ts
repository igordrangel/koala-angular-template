import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ListAbstract } from './list.abstract';
import { ListItemInterface } from './list.item.interface';
import { ListItemMenuOptionInterface } from './list.item-menu-option.interface';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'koala-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css']
})
export class ListComponent extends ListAbstract implements OnInit, OnChanges {
  @Input() titlePage: string = 'Title';
  @Input() titleIcon: string;
  @Input() customFolderFontColor: string = '#212121';
  @Input() customFolderBackgroudColor: string = '#fff';
  @Input() columnsToShowInList: string[];
  @Input() columnSort: string;
  @Input() itensMenuListOptions: ListItemMenuOptionInterface[];
  @Input() itemsList: ListItemInterface[];
  @Input() formSearch: FormGroup;
  @Input() request: Observable<any> | Promise<any>;
  @Input() responseIndexName: string;
  @Input() responseQtdResultIndexName: (response: any) => number;
  @Input() typeRequest: 'all' | 'onDemand';
  @Input() error = () => {
  };
  @ViewChild('folder', {static: true}) private folder: ElementRef;
  @ViewChild('folderTitle', {static: true}) private folderTitle: ElementRef;

  constructor() {
    super(
      () => this.request,
      (response) => {
        this.dataSource.data = this.responseIndexName ?
          response[this.responseIndexName] :
          response;
        this.qtdListResult = this.responseQtdResultIndexName ?
          this.responseQtdResultIndexName(response) :
          this.dataSource.data.length;
      },
      () => this.error(),
      () => this.formSearch
    );
  }

  ngOnInit() {
    this.setCustomBackgroundColor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.customBackgroudColor) {
      this.setCustomBackgroundColor();
    }
  }

  private setCustomBackgroundColor() {
    if (this.customFolderBackgroudColor) {
      const folder = this.folder.nativeElement as HTMLDivElement;
      folder.style.background = this.customFolderBackgroudColor;
    }
    if (this.customFolderFontColor) {
      const folderTitle = this.folderTitle.nativeElement as HTMLDivElement;
      folderTitle.style.color = this.customFolderFontColor;
    }
  }
}
