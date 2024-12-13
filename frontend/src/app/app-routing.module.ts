import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoasTableComponent } from './components/pessoas-table/pessoas-table.component';
import { PessoasFormComponent } from './components/pessoas-form/pessoas-form.component';

const routes: Routes = [
  {path: '', component: PessoasTableComponent},
  {path: 'pessoa', component: PessoasFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
