import { MatLegacyPaginatorIntl as MatPaginatorIntl } from '@angular/material/legacy-paginator';
import { Injectable } from '@angular/core';

@Injectable()
export class PaginationProvider extends MatPaginatorIntl {
  constructor() {
    super();
    this.getAndInitTranslations();
  }

  public getAndInitTranslations() {
    this.itemsPerPageLabel = "Itens por Página";
    this.firstPageLabel = "Primeira Página";
    this.nextPageLabel = "Próxima Página";
    this.previousPageLabel = "Página Anterior";
    this.lastPageLabel = "Última Página";
    this.changes.next();
  }

  public getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 / ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} / ${length}`;
  }
}
