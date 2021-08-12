import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule as BxModule } from '../../../../common.module';

import { IonicModule } from '@ionic/angular';

import { ReceptionBoxScanPageRoutingModule } from './reverse-tracking-box-scan-routing.module';

import { ReverseTrackingBoxScanPage } from './reverse-tracking-box-scan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      BxModule,
    ReceptionBoxScanPageRoutingModule
  ],
  declarations: [ReverseTrackingBoxScanPage]
})
export class ReceptionBoxScanPageModule {}
