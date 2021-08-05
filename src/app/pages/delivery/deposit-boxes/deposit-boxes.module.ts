import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepositBoxesPageRoutingModule } from './deposit-boxes-routing.module';

import { DepositBoxesPage } from './deposit-boxes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepositBoxesPageRoutingModule
  ],
  declarations: [DepositBoxesPage]
})
export class DepositBoxesPageModule {}
