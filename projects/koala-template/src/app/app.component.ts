import { Component } from '@angular/core';
import { TokenService } from '../../../ngx-koala/src/lib/shared/components/token/token.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    TokenService
  ]
})
export class AppComponent {
  public token: BehaviorSubject<string>;

  constructor(
    tokenService: TokenService
  ) {
    this.token = tokenService.getTokenSubject();
  }
}
