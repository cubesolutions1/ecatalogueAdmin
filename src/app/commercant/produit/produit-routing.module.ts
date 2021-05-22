import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddproduitComponent } from './addproduit/addproduit.component';
import { ShowproduitComponent } from './showproduit/showproduit.component';

const routes: Routes = [
  {
      path: '',
      children: [
          {
              path: 'add',
              component: AddproduitComponent,
              data: {
                  title: 'add produit'
              }
          },
          {
              path: 'edit/:idEdit',
              component: AddproduitComponent,
              data: {
                  title: 'edit produit'
              }
          },
          {
              path: 'show',
              component: ShowproduitComponent,
              data: {
                  title: 'Show produit'
              }
          },
      ]


  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduitRoutingModule { }
