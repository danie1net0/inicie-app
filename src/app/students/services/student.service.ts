import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, Observable } from 'rxjs';

import { ApiPaginatedResponse } from '../../shared/interfaces/api-paginated-response';
import { Student } from '../interfaces/student';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private readonly endpoint: string = `${environment.api.url}/students`;
  private readonly httpClient: HttpClient = inject(HttpClient);

  public index(): Observable<ApiPaginatedResponse<Student>> {
    return this.httpClient.get<ApiPaginatedResponse<Student>>(this.endpoint).pipe(first());
  }
}
