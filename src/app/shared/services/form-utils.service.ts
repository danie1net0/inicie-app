import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FormUtilsService {
  public getFieldErrorMessage(formGroup: FormGroup, fieldName: string): string {
    const field = formGroup.get(fieldName) as FormControl;

    return this.getErrorMessageFromField(field);
  }

  public getErrorMessageFromField(field: FormControl): string {
    for (const controlName in field.errors) {
      if (!Object.prototype.hasOwnProperty.call(field.errors, controlName)) {
        continue;
      }

      if (typeof field.errors[controlName] === 'string') {
        return field.errors[controlName];
      }

      return this.getErrorMessage(controlName, field.errors[controlName]);
    }

    return '';
  }

  public handleHttpErrors(form: FormGroup, error: HttpErrorResponse): void {
    if (error.status !== 422) {
      return;
    }

    const errors = error.error.errors;

    Object.keys(errors).forEach((fieldName: string) => {
      const field = form.get(fieldName);

      if (field) {
        field.setErrors({ [fieldName]: error.error.errors[fieldName][0] });
      }
    });
  }

  private getErrorMessage(validatorName: string, validationErrors: ValidationErrors): string {
    return (
      {
        required: 'Este campo é obrigatório',
        email: 'E-mail inválido',
        minlength: `Este campo deve ter no mínimo ${validationErrors['requiredLength']} caracteres`,
        maxlength: `Este campo deve ter no máximo ${validationErrors['requiredLength']} caracteres`,
        min: `Este valor deve ser maior que ${validationErrors['min']}`,
        max: `Este valor deve ser menor que ${validationErrors['max']}`,
      }[validatorName] || 'Campo inválido'
    );
  }
}
