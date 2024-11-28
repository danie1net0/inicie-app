import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

import { Student } from '../../interfaces/student';

@Component({
  selector: 'app-students-table',
  imports: [MatTableModule, MatIcon, MatIconButton],
  templateUrl: './students-table.component.html',
  styleUrl: './students-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsTableComponent {
  @Input() public students: Student[] = [];
  @Output() public edit: EventEmitter<number> = new EventEmitter<number>();
  @Output() public delete: EventEmitter<number> = new EventEmitter<number>();

  public displayedColumns: string[] = ['name', 'email', 'actions'];

  public onEdit(id: number): void {
    this.edit.emit(id);
  }

  public onDelete(id: number): void {
    this.delete.emit(id);
  }
}
