import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';

//Route for content layout with sidebar, navbar and footer.

export const Commerce_ROUTES: Routes = [
  {
    path: 'catalogues',
    loadChildren: () => import('../../commercant/catalogue/catalogue.module').then(m => m.CatalogueModule), canActivate: [AuthGuard],
    data: {
      role: 'commercant'
    },
  },
  {
    path: 'produits',
    loadChildren: () => import('../../commercant/produit/produit.module').then(m => m.ProduitModule), canActivate: [AuthGuard],
    data: {
      role: 'commercant'
    },

  },
  
];
