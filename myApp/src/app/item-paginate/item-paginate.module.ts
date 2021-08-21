import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemPaginatePageRoutingModule } from './item-paginate-routing.module';

import { ItemPaginatePage } from './item-paginate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemPaginatePageRoutingModule
  ],
  declarations: [ItemPaginatePage]
})
export class ItemPaginatePageModule {}
