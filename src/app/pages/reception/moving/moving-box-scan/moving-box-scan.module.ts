import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonModule as BxModule} from '../../../../common.module';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MovingBoxScanPageRoutingModule} from './moving-box-scan-routing.module';

import {MovingBoxScanPage} from './moving-box-scan.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MovingBoxScanPageRoutingModule,
        BxModule
    ],
    declarations: [MovingBoxScanPage]
})
export class MovingBoxScanPageModule {
}
