import { ShowcommercantComponent } from './showcommercant/showcommercant.component';
import { AddcommercantComponent } from './addcommercant/addcommercant.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      children: [
          {
              path: 'add',
              component: AddcommercantComponent,
              data: {
                  title: 'add commercant'
              }
          },
          {
              path: 'edit/:idEdit',
              component: AddcommercantComponent,
              data: {
                  title: 'edit commercant'
              }
          },
          {
              path: 'show',
              component: ShowcommercantComponent,
              data: {
                  title: 'Show commercant'
              }
          },
      ]


  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommercantRoutingModule { }
