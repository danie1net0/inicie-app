import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { FormUtilsService } from '../../../shared/services/form-utils.service';
import { Student } from '../../interfaces/student';

@Component({
  selector: 'app-student-form',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss',
})
export class StudentFormComponent {
  @Input() public form!: FormGroup;
  @Output() public formSubmit: EventEmitter<Student | undefined> = new EventEmitter<Student | undefined>();

  private readonly formUtils: FormUtilsService = inject(FormUtilsService);

  public getErrorMessage(fieldName: string): string {
    return this.formUtils.getFieldErrorMessage(this.form, fieldName);
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.formSubmit.emit(this.form.value);
  }
}
