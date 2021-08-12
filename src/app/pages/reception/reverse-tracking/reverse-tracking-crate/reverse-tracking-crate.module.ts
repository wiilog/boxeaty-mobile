import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModule as BxModule } from '../../../../common.module';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceptionCratePageRoutingModule } from './reverse-tracking-crate-routing.module';

import { ReverseTrackingCratePage } from './reverse-tracking-crate.page';

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      IonicModule,
      ReceptionCratePageRoutingModule,
      BxModule
  ],
    declarations: [ReverseTrackingCratePage]
})
export class ReceptionCratePageModule {}
