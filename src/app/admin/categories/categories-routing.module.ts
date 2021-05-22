import { ShowcategoriesComponent } from './showcategories/showcategories.component';
import { AddcategoriesComponent } from './addcategories/addcategories.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      children: [
          {
              path: 'add',
              component: AddcategoriesComponent,
              data: {
                  title: 'add categories'
              }
          },
          {
              path: 'edit/:idEdit',
              component: AddcategoriesComponent,
              data: {
                  title: 'edit categories'
              }
          },
          {
              path: 'show',
              component: ShowcategoriesComponent,
              data: {
                  title: 'Show categories'
              }
          },
      ]


  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
