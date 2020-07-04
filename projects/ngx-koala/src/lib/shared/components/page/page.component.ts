import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'koala-page',
  templateUrl: 'page.component.html',
  styleUrls: ['page.component.css']
})
export class PageComponent implements OnInit {
  @Input() color: ThemePalette;
  @Input() logotipo: string;
  @Input() startMenuOpened = true;
  @Input() token: BehaviorSubject<string>;
  public logged: boolean;

  ngOnInit() {
    this.token?.subscribe(token => this.logged = !!token);
  }
}
