import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { Router } from '@angular/router';

import { StudentFormComponent } from '../../components/student-form/student-form.component';
import { Student } from '../../interfaces/student';
import { StudentService } from '../../services/student.service';
import { DialogService } from '../../../shared/services/dialog.service';
import { FormUtilsService } from '../../../shared/services/form-utils.service';

@Component({
  selector: 'app-create-student',
  imports: [CommonModule, MatCardModule, MatToolbarModule, MatIconModule, MatIconButton, StudentFormComponent],
  templateUrl: './create-student.component.html',
  styleUrl: './create-student.component.scss',
})
export class CreateStudentComponent {
  private readonly router: Router = inject(Router);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly studentService: StudentService = inject(StudentService);
  private readonly dialogService: DialogService = inject(DialogService);
  private readonly formUtils: FormUtilsService = inject(FormUtilsService);

  public form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
  });

  public async onGoBack(): Promise<void> {
    await this.router.navigate(['/']);
  }

  public async onSubmit(student?: Student): Promise<void> {
    if (!student) {
      return;
    }

    this.studentService.store(student).subscribe({
      next: (): void => {
        this.form.reset();
        this.form.markAsPristine();

        this.dialogService.info('Sucesso', 'Estudante criado com êxito!');
      },
      error: (error): void => {
        if (error?.status !== 422) {
          this.dialogService.info('Ooops...', 'Erro ao criar estudante, contate o suporte técnico.');
        }

        this.formUtils.handleHttpErrors(this.form, error);
      },
    });
  }
}
