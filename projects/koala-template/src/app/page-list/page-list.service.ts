import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CountriesInterface } from './countries.interface';

@Injectable({providedIn: 'root'})
export class PageListService {

  constructor(private http: HttpClient) {
  }

  public get(params?: any) {
    return this.http.get<CountriesInterface[]>('https://restcountries.eu/rest/v2/all', {
      params
    });
  }
}
