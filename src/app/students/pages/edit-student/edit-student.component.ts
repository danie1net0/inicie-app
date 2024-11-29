import { Component, inject, Input, OnInit } from '@angular/core';
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
  selector: 'app-edit-student',
  imports: [CommonModule, MatCardModule, MatToolbarModule, MatIconModule, MatIconButton, StudentFormComponent],
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.scss',
})
export class EditStudentComponent implements OnInit {
  @Input() public id!: number;

  private readonly router: Router = inject(Router);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly studentService: StudentService = inject(StudentService);
  private readonly dialogService: DialogService = inject(DialogService);
  private readonly formUtils: FormUtilsService = inject(FormUtilsService);

  public form: FormGroup = this.formBuilder.group({
    id: [this.id],
    name: ['', [Validators.required, Validators.maxLength(255)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
  });

  public ngOnInit(): void {
    this.studentService.show(this.id).subscribe({
      next: (student: Student): void => this.form.setValue(student),
    });
  }

  public async onGoBack(): Promise<void> {
    await this.router.navigate(['/']);
  }

  public async onSubmit(student?: Student): Promise<void> {
    if (!student) {
      return;
    }

    this.studentService.update(student).subscribe({
      next: (): void => {
        this.dialogService.info('Sucesso', 'Estudante atualizado com êxito!');
      },
      error: (error): void => {
        if (error?.status !== 422) {
          this.dialogService.info('Ooops...', 'Erro ao atualizar estudante, contate o suporte técnico.');
        }

        this.formUtils.handleHttpErrors(this.form, error);
      },
    });
  }
}
