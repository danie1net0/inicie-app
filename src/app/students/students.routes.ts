import { Routes } from '@angular/router';

import { ListStudentsComponent } from './pages/list-students/list-students.component';
import { CreateStudentComponent } from './pages/create-student/create-student.component';
import { EditStudentComponent } from './pages/edit-student/edit-student.component';

export default [
  {
    path: '',
    component: ListStudentsComponent,
  },
  {
    path: 'cadastrar',
    component: CreateStudentComponent,
  },
  {
    path: 'editar/:id',
    component: EditStudentComponent,
  },
] as Routes;
