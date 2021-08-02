import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonModule as BxModule} from '../../../common.module';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ReceptionBoxEditPageRoutingModule} from './reception-box-edit-routing.module';

import {ReceptionBoxEditPage} from './reception-box-edit.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BxModule,
        ReceptionBoxEditPageRoutingModule
    ],
    declarations: [ReceptionBoxEditPage]
})
export class ReceptionBoxEditPageModule {
}
