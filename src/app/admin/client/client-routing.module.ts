import { ShowclientComponent } from './showclient/showclient.component';
import { AddclientComponent } from './addclient/addclient.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      children: [
          {
              path: 'add',
              component: AddclientComponent,
              data: {
                  title: 'add client'
              }
          },
          {
              path: 'edit/:idEdit',
              component: AddclientComponent,
              data: {
                  title: 'edit client'
              }
          },
          {
              path: 'show',
              component: ShowclientComponent,
              data: {
                  title: 'Show client'
              }
          },
      ]


  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
