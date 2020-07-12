import { Papa } from 'ngx-papaparse';
import { Injectable } from '@angular/core';

@Injectable({providedIn: "root"})
export class KoalaCsvService {

  constructor(private papa: Papa) {
  }

  public convertJsonToCsv(json: object[], filename: string = 'export') {
    this.downloadCsv(new Blob([
      this.papa.unparse(json, {
        header: true,
        delimiter: ";",
        newline: "\r\n"
      })], {
      type: 'text/csv;charset=utf-8;'
    }), filename);
  }

  private downloadCsv(blob: Blob, filename: string = 'export') {
    let link = document.createElement('a');
    let url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename + '.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
