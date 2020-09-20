import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'koala-folder-page',
  templateUrl: 'folder.component.html',
  styleUrls: ['folder.component.css']
})
export class FolderComponent implements OnInit, OnChanges {
  @Input() titlePage: string = 'Title';
  @Input() titleIcon: string;
  @Input() customFolderFontColor: string = '#212121';
  @Input() customFolderBackgroudColor: string = '#FFF';

  @ViewChild('folder', {static: true}) private folder: ElementRef;
  @ViewChild('folderTitle', {static: true}) private folderTitle: ElementRef;
  @ViewChild('folderIconTitle', {static: true}) private folderIconTitle: ElementRef;

  ngOnInit() {
    this.setCustomBackgroundColor();
  }

  ngOnChanges(changes: SimpleChanges) {
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
      const folderIconTitle = this.folderTitle.nativeElement as HTMLDivElement;
      folderIconTitle.style.color = this.customFolderFontColor;
    }
  }
}
