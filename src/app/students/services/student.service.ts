import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { first, map, Observable } from 'rxjs';

import { ApiPaginatedResponse } from '../../shared/interfaces/api-paginated-response';
import { Student } from '../interfaces/student';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../shared/interfaces/api-response';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private readonly endpoint: string = `${environment.api.url}/students`;
  private readonly httpClient: HttpClient = inject(HttpClient);

  public index(params: object = {}): Observable<ApiPaginatedResponse<Student>> {
    params = {
      params: this.params(params),
    };

    return this.httpClient.get<ApiPaginatedResponse<Student>>(this.endpoint, params).pipe(first());
  }

  public show(id: number): Observable<Student> {
    return this.httpClient.get<ApiResponse<Student>>(`${this.endpoint}/${id}`).pipe(
      first(),
      map((student: ApiResponse<Student>): Student => student.data),
    );
  }

  public store(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(this.endpoint, student).pipe(first());
  }

  public update(student: Student): Observable<Student> {
    return this.httpClient.put<Student>(`${this.endpoint}/${student.id}`, student).pipe(first());
  }

  public destroy(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.endpoint}/${id}`).pipe(first());
  }

  private params(params: object = {}): HttpParams {
    let httpParams: HttpParams = new HttpParams();

    Object.entries(params).forEach(([key, value]): void => {
      if (value) {
        httpParams = httpParams.set(key, value as string);
      }
    });

    return httpParams;
  }
}
