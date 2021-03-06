import * as Excel from "exceljs/dist/exceljs.min.js";
import * as ExcelProper from "exceljs";
import * as fs from 'file-saver';

import { Injectable } from "@angular/core";
import { KoalaXlsxConfigInterface } from "./koala.xlsx-config.interface";
import { koala } from "koala-utils";

@Injectable({providedIn: "any"})
export class KoalaXlsxService {

  public async convertJsonToXlsx(json: any[], config: KoalaXlsxConfigInterface) {
    const title = config.title;
    const header = [];

    Object.keys(json[0]).forEach(name => {
      header.push(koala(name).string().normalize().getValue().toUpperCase());
    });

    const workbook: ExcelProper.Workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet(config.sheetName);
    if (config.password) await worksheet.protect(config.password, {
      selectLockedCells: false,
      selectUnlockedCells: false,
      scenarios: false
    });

    const titleRow = worksheet.addRow([title]);
    titleRow.alignment = {horizontal: "center"};
    titleRow.font = {bold: true, color: {argb: config.titleFontColor.replace('#', '')}};
    titleRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: {argb: config.titleBackgroundColor.replace('#', '')},
      bgColor: {argb: config.titleBackgroundColor.replace('#', '')}
    }
    worksheet.mergeCells(`A1:${worksheet.getCell(1, Object.keys(json[0]).length).address}`);

    const headerRow = worksheet.addRow(header);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {argb: config.headerBackgroundColor.replace('#', '')},
        bgColor: {argb: config.headerBackgroundColor.replace('#', '')}
      };
      cell.font = {
        color: {argb: config.headerFontColor.replace('#', '')}
      };
    });

    json.forEach(item => {
      const data = [];
      Object.values(item).forEach(value => data.push(value));
      worksheet.addRow(data);
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      fs.saveAs(blob, config.filename + '.xlsx');
    });
  }
}
