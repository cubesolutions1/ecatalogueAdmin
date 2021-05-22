import { ShowadminComponent } from './showadmin/showadmin.component';
import { AddadminComponent } from './addadmin/addadmin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      children: [
          {
              path: 'add',
              component: AddadminComponent,
              data: {
                  title: 'add admin'
              }
          },
          {
              path: 'edit/:idEdit',
              component: AddadminComponent,
              data: {
                  title: 'edit admin'
              }
          },
          {
              path: 'show',
              component: ShowadminComponent,
              data: {
                  title: 'Show admin'
              }
          },
      ]


  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
