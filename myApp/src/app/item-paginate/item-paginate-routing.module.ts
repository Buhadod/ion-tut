import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemPaginatePage } from './item-paginate.page';

const routes: Routes = [
  {
    path: '',
    component: ItemPaginatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemPaginatePageRoutingModule {}
