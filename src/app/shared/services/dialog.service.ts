import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';

import { DialogComponent } from '../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialog: MatDialog;

  public constructor() {
    this.dialog = inject(MatDialog);
  }

  public async confirmation(title: string, content: string): Promise<boolean> {
    const dialogRef: MatDialogRef<DialogComponent> = this.dialog.open(DialogComponent, {
      data: {
        title,
        content,
        okButton: 'Confirmar',
        cancelButton: 'Cancelar',
      },
    });

    return firstValueFrom(dialogRef.afterClosed());
  }

  public info(title: string, content: string): void {
    this.dialog.open(DialogComponent, {
      data: {
        title,
        content,
        okButton: 'Ok',
      },
    });
  }
}
