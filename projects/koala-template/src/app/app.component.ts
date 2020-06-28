import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormAbstract } from '../../../ngx-koala/src/lib/core/form.abstract';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends FormAbstract implements OnInit {
  public formTest: FormGroup;

  constructor(private _fb: FormBuilder) {
    super(() => this.formTest);
  }

  ngOnInit() {
    this.formTest = this._fb.group({});
  }

  public submit() {
    this.loading(true);
    setTimeout(() => {
      this.loading(false);
      console.log(this.formTest);
    }, 2000);
  }
}
