import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { KoalaIconType } from '@koalarx/ui/icon';
import { KoalaNavigateHistoryInterface } from "./koala-navigate-history.interface";

@Component({
  selector: 'koala-folder-page',
  templateUrl: 'folder.component.html',
  styleUrls: ['folder.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FolderComponent implements OnInit, OnChanges {
  @Input() titlePage: string = 'Title';
  @Input() titleIcon?: string | KoalaIconType;
  @Input() koalaIcon?: boolean;
  @Input() customFolderFontColor: string = '#212121';
  @Input() customFolderBackgroudColor: string = '#FFF';
  @Input() navigateHistory?: KoalaNavigateHistoryInterface[];

  @ViewChild('folder', {static: true}) private folder?: ElementRef;
  @ViewChild('folderTitle', {static: true}) private folderTitle?: ElementRef;
  @ViewChild('folderNavigateHistory', {static: false}) private folderNavigateHistory?: ElementRef;

  ngOnInit() {
    this.setCustomBackgroundColor();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.customBackgroudColor || changes.customFolderFontColor) {
      this.setCustomBackgroundColor();
    }
  }

  public getKoalaIcon() {
    return this.titleIcon as KoalaIconType;
  }

  private setCustomBackgroundColor() {
    if (this.customFolderBackgroudColor) {
      const folder = this.folder?.nativeElement as HTMLDivElement;
      folder.style.background = this.customFolderBackgroudColor;
    }
    if (this.customFolderFontColor) {
      const folderTitle = this.folderTitle?.nativeElement as HTMLDivElement;
      folderTitle.style.color = this.customFolderFontColor;
      const folderIconTitle = this.folderTitle?.nativeElement as HTMLDivElement;
      folderIconTitle.style.color = this.customFolderFontColor;
      setTimeout(() => {
        if (this.folderNavigateHistory) {
          const folderNavigateHistory = this.folderNavigateHistory.nativeElement as HTMLDivElement;
          folderNavigateHistory.style.color = this.customFolderFontColor;
        }
      }, 50);
    }
  }
}
