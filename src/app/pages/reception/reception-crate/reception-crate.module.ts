import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModule as BxModule } from '../../../common.module';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceptionCratePageRoutingModule } from './reception-crate-routing.module';

import { ReceptionCratePage } from './reception-crate.page';

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      IonicModule,
      ReceptionCratePageRoutingModule,
      BxModule
  ],
    declarations: [ReceptionCratePage]
})
export class ReceptionCratePageModule {}
