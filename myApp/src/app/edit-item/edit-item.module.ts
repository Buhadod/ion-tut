import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditItemPageRoutingModule } from './edit-item-routing.module';

import { EditItemPage } from './edit-item.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditItemPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditItemPage]
})
export class EditItemPageModule {}
