import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'alunos',
  },
  {
    path: 'alunos',
    loadChildren: (): Promise<{ default: Routes }> => import('./students/students.routes'),
  },
];
