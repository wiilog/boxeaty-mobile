import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule as BxModule } from '../../../common.module';

import { IonicModule } from '@ionic/angular';

import { ReceptionBoxScanPageRoutingModule } from './reception-box-scan-routing.module';

import { ReceptionBoxScanPage } from './reception-box-scan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      BxModule,
    ReceptionBoxScanPageRoutingModule
  ],
  declarations: [ReceptionBoxScanPage]
})
export class ReceptionBoxScanPageModule {}
