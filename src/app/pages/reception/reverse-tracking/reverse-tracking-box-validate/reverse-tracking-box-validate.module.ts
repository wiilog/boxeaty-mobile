import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonModule as BxModule} from '../../../../common.module';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ReceptionBoxEditPageRoutingModule} from './reverse-tracking-box-validate-routing.module';

import {ReverseTrackingBoxValidatePage} from './reverse-tracking-box-validate.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BxModule,
        ReceptionBoxEditPageRoutingModule
    ],
    declarations: [ReverseTrackingBoxValidatePage]
})
export class ReceptionBoxEditPageModule {
}
