import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from '../guards/role.guard';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
 
  {
    path: 'dashboard',
    loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [RoleGuard],
    data: {
      role: 'admin'
    }
  },
  {
    path: 'enseignes',
    loadChildren: () => import('../../admin/enseigne/enseigne.module').then(m => m.EnseigneModule),
    canActivate: [RoleGuard],
    data: {
      role: 'admin'
    }
  },
  {
    path: 'admins',
    loadChildren: () => import('../../admin/admin/admin.module').then(m => m.AdminModule),
    canActivate: [RoleGuard],
    data: {
      role: 'admin'
    }
  
  },
  {
    path: 'commercants',
    loadChildren: () => import('../../commercant/commercant/commercant.module').then(m => m.CommercantModule),
    canActivate: [RoleGuard],
    data: {
      role: 'admin'
    }
  },
  {
    path: 'clients',
    loadChildren: () => import('../../admin/client/client.module').then(m => m.ClientModule),
    canActivate: [RoleGuard],
    data: {
      role: 'admin'
    }
  },
  {
    path: 'categories',
    loadChildren: () => import('../../admin/categories/categories.module').then(m => m.CategoriesModule),
    canActivate: [RoleGuard],
    data: {
      role: 'admin'
    }
  },
  {
    path: 'catalogues',
    loadChildren: () => import('../../commercant/catalogue/catalogue.module').then(m => m.CatalogueModule),
    canActivate: [RoleGuard],
    data: {
      role: 'commercant'
    }
  },
  {
    path: 'bannieres',
    loadChildren: () => import('../../admin/banniere/banniere.module').then(m => m.BanniereModule),
    canActivate: [RoleGuard],
    data: {
      role: 'admin'
    }
  },
  {
    path: 'produits',
    loadChildren: () => import('../../commercant/produit/produit.module').then(m => m.ProduitModule),
    canActivate: [RoleGuard],
    data: {
      role: 'commercant'
    }
  },
  {
    path: 'messages',
    loadChildren: () => import('../../commercant/chat/chat.module').then(m => m.ChatModule),
    canActivate: [RoleGuard],
    data: {
      role: 'commercant'
    }
  },
  {
    path: 'calendar',
    loadChildren: () => import('../../calendar/calendar.module').then(m => m.CalendarsModule)
  },
  {
    path: 'charts',
    loadChildren: () => import('../../charts/charts.module').then(m => m.ChartsNg2Module)
  },
   {
    path: 'forms',
    loadChildren: () => import('../../forms/forms.module').then(m => m.FormModule)
  },
  {
    path: 'maps',
    loadChildren: () => import('../../maps/maps.module').then(m => m.MapsModule)
  },
  {
    path: 'tables',
    loadChildren: () => import('../../tables/tables.module').then(m => m.TablesModule)
  },
  {
    path: 'datatables',
    loadChildren: () => import('../../data-tables/data-tables.module').then(m => m.DataTablesModule)
  },
  {
    path: 'uikit',
    loadChildren: () => import('../../ui-kit/ui-kit.module').then(m => m.UIKitModule)
  },
  {
    path: 'components',
    loadChildren: () => import('../../components/ui-components.module').then(m => m.UIComponentsModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('../../pages/full-pages/full-pages.module').then(m => m.FullPagesModule)
  },
  {
    path: 'cards',
    loadChildren: () => import('../../cards/cards.module').then(m => m.CardsModule)
  },
  {
    path: 'colorpalettes',
    loadChildren: () => import('../../color-palette/color-palette.module').then(m => m.ColorPaletteModule)
  },
 
  {
    path: 'chat-ngrx',
    loadChildren: () => import('../../chat-ngrx/chat-ngrx.module').then(m => m.ChatNGRXModule)
  },
  {
    path: 'inbox',
    loadChildren: () => import('../../inbox/inbox.module').then(m => m.InboxModule)
  },
  {
    path: 'taskboard',
    loadChildren: () => import('../../taskboard/taskboard.module').then(m => m.TaskboardModule)
  },
  {
    path: 'taskboard-ngrx',
    loadChildren: () => import('../../taskboard-ngrx/taskboard-ngrx.module').then(m => m.TaskboardNGRXModule)
  },
  {
    path: 'player',
    loadChildren: () => import('../../player/player.module').then(m => m.PlayerModule)
  }
];
