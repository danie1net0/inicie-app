import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';

import { ApiPaginatedResponse } from '../../interfaces/api-paginated-response';
import { CustomPaginatorIntl } from './custom-paginator-intl';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [MatPaginator, JsonPipe],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }],
})
export class PaginationComponent {
  @Input() public resources!: ApiPaginatedResponse<object>;
  @Output() public page: EventEmitter<number> = new EventEmitter<number>();

  public get pageIndex(): number {
    const currentPage: number | undefined = this.resources.meta?.current_page;

    if (!currentPage) {
      return 1;
    }

    return currentPage - 1;
  }

  public onChangePage(page: PageEvent): void {
    this.page.emit(page.pageIndex + 1);
  }
}
