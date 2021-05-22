import { ShowcatalogueComponent } from './showcatalogue/showcatalogue.component';
import { AddcatlogueComponent } from './addcatalogue/addcatalogue.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      children: [
          {
              path: 'add',
              component: AddcatlogueComponent,
              data: {
                  title: 'add catalogue'
              }
          },
          {
              path: 'edit/:idEdit',
              component: AddcatlogueComponent,
              data: {
                  title: 'edit catalogue'
              }
          },
          {
              path: 'show',
              component: ShowcatalogueComponent,
              data: {
                  title: 'Show catalogue'
              }
          },
      ]


  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueRoutingModule { }
