import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePacienteComponent } from './pages/create-paciente/create-paciente.component';
import { FindPacienteComponent } from './pages/find-paciente/find-paciente.component';
import { ListPacientesComponent } from './pages/list-pacientes/list-pacientes.component';

const routes: Routes = [
  {
    path: 'createExpediente',
    component: CreatePacienteComponent
  },
  {
    path: 'findExpediente',
    component: FindPacienteComponent
  },
  {
    path: 'listPacientes',
    component: ListPacientesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
