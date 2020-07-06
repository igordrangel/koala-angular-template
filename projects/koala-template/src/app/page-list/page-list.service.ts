import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class PageListService {

  constructor(private http: HttpClient) {
  }

  public get() {
    return this.http.get('https://restcountries.eu/rest/v2/all');
  }
}
