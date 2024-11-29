import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { catchError, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { StudentsTableComponent } from '../../components/students-table/students-table.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { ApiPaginatedResponse } from '../../../shared/interfaces/api-paginated-response';
import { Student } from '../../interfaces/student';
import { StudentService } from '../../services/student.service';
import { DialogService } from '../../../shared/services/dialog.service';

@Component({
  selector: 'app-list-students',
  imports: [
    MatCardModule,
    MatPaginatorModule,
    MatToolbar,
    MatIconModule,
    MatProgressSpinner,
    StudentsTableComponent,
    CommonModule,
    PaginationComponent,
    MatIconButton,
  ],
  templateUrl: './list-students.component.html',
  styleUrl: './list-students.component.scss',
})
export class ListStudentsComponent {
  private readonly router: Router = inject(Router);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly studentsService: StudentService = inject(StudentService);
  private readonly dialogService: DialogService = inject(DialogService);

  public students$: Observable<ApiPaginatedResponse<Student>> = this.refresh$();

  public async onAdd(): Promise<void> {
    await this.router.navigate(['cadastrar'], {
      relativeTo: this.activatedRoute,
    });
  }

  public async onEdit(id: number): Promise<void> {
    await this.router.navigate([`editar/${id}`], {
      relativeTo: this.activatedRoute,
    });
  }

  public async onDelete(id: number): Promise<void> {
    const confirmation: boolean = await this.dialogService.confirmation(
      'Deletar aluno',
      'Você tem certeza que deseja remover este aluno?',
    );

    if (!confirmation) {
      return;
    }

    this.studentsService.destroy(id).subscribe({
      next: (): void => {
        this.dialogService.info('Sucesso', 'Aluno removido com êxito!');
        this.students$ = this.refresh$();
      },
      error: (): void => {
        this.dialogService.info('Ooops...', 'Error ao remover aluno, contate o suporte técnico.');
      },
    });
  }

  public onChangePage(page: number): void {
    this.students$ = this.refresh$(page);
  }

  private refresh$(page = 1): Observable<ApiPaginatedResponse<Student>> {
    return this.studentsService.index({ page }).pipe(
      catchError((): Observable<ApiPaginatedResponse<Student>> => {
        this.dialogService.info('Ooops...', 'Erro ao carregar alunos, contate o suporte técnico.');

        return of({
          data: [],
        });
      }),
    );
  }
}
