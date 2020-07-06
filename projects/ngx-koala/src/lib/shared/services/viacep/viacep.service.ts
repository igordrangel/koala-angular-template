import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ViacepInterface } from './viacep.interface';

@Injectable({providedIn: 'root'})
export class ViacepService {
  private baseUrl = 'https://viacep.com.br';

  constructor(private http: HttpClient) {
  }

  public get(cep: number) {
    return this.http.get<ViacepInterface>(`${this.baseUrl}/ws/${cep}/json/`);
  }
}
