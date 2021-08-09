import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'items',
    pathMatch: 'full' 
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'items',
    loadChildren: () => import('./items/items.module').then( m => m.ItemsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'item/:id',
    loadChildren: () => import('./item/item.module').then( m => m.ItemPageModule)
  },
  {
    path: 'edit-item/:id',
    loadChildren: () => import('./edit-item/edit-item.module').then( m => m.EditItemPageModule)
  },
  {
    path: 'create-item',
    loadChildren: () => import('./create-item/create-item.module').then( m => m.CreateItemPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
