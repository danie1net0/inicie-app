import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

interface DialogData {
  title: string;
  content: string;
  okButton?: string;
  cancelButton?: string;
}

@Component({
  selector: 'app-dialog',
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  public data: DialogData = inject(MAT_DIALOG_DATA);

  public readonly dialogRef: MatDialogRef<DialogComponent> = inject(MatDialogRef<DialogComponent>);

  public onConfirm(result: boolean): void {
    this.dialogRef.close(result);
  }
}
