import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Injectable()
export class CustomPaginatorIntl implements MatPaginatorIntl {
  public firstPageLabel = 'Primeira página';
  public itemsPerPageLabel = 'Itens por página:';
  public lastPageLabel = 'Última página';
  public nextPageLabel = 'Próxima página';
  public previousPageLabel = 'Página anterior';
  public changes: Subject<void> = new Subject<void>();

  public getRangeLabel(page: number, pageSize: number, length: number): string {
    return `Página ${page + 1} de ${Math.ceil(length / pageSize)}`;
  }
}
