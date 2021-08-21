import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { SkipGuard } from './guard/skip.guard';

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
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [SkipGuard],
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
  },
  {
    path: 'item-paginate',
    loadChildren: () => import('./item-paginate/item-paginate.module').then( m => m.ItemPaginatePageModule)
  },
  {
    path: 'item-search',
    loadChildren: () => import('./item-search/item-search.module').then( m => m.ItemSearchPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
