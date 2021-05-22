import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddbanniereComponent } from './addbanniere/addbanniere.component';
import { ShowbanniereComponent } from './showbanniere/showbanniere.component';

const routes: Routes = [
  {
      path: '',
      children: [
          {
              path: 'add',
              component: AddbanniereComponent,
              data: {
                  title: 'add bannieres'
              }
          },
          {
              path: 'edit/:idEdit/:photo',
              component: AddbanniereComponent,
              data: {
                  title: 'edit bannieres'
              }
          },
          {
              path: 'show',
              component: ShowbanniereComponent,
              data: {
                  title: 'Show bannieres'
              }
          },
      ]


  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BanniereRoutingModule { }
