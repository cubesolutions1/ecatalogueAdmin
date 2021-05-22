
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddenseigneComponent } from './addenseigne/addenseigne.component';
import { ShowenseigneComponent } from './showenseigne/showenseigne.component';

const routes: Routes = [
  {
      path: '',
      children: [
          {
              path: 'add',
              component: AddenseigneComponent,
              data: {
                  title: 'add enseigne'
              }
          },
          {
              path: 'edit/:idEdit',
              component: AddenseigneComponent,
              data: {
                  title: 'edit enseigne'
              }
          },
          {
              path: 'show',
              component: ShowenseigneComponent,
              data: {
                  title: 'Show enseigne'
              }
          },
      ]


  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnseigneRoutingModule { }
