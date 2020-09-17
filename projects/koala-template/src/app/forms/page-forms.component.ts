import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: 'page-forms.component.html',
  styleUrls: ['page-forms.component.css']
})
export class PageFormsComponent implements OnInit {
  public formLocation: FormGroup;
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.formLocation = this.fb.group({});
  }
}
