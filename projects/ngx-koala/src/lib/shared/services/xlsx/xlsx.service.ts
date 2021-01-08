import * as jsonToXlsx from 'json-as-xlsx';

import {Injectable} from "@angular/core";
import {KoalaXlsxConfigInterface} from "./koala-xlsx-config.interface";

@Injectable({providedIn: "any"})
export class XlsxService {

  public convertJsonToXlsx(filename: string, json: any[], config: KoalaXlsxConfigInterface) {
    const columns = [];
    const content = [];

    json.forEach((item, index) => {

    });

    const settings = {
      sheetName: filename,
      fileName: filename,
      writeOptions: {} // Style options from https://github.com/SheetJS/sheetjs#writing-options
    };
    jsonToXlsx()
  }
}
