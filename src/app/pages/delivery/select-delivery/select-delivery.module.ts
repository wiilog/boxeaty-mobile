import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SelectDeliveryPageRoutingModule} from './select-delivery-routing.module';

import {SelectDeliveryPage} from './select-delivery.page';
import {CommonModule} from "@app/common.module";
import {CommonModule as AngularCommonModule} from '@angular/common';

@NgModule({
    imports: [
        AngularCommonModule,
        CommonModule,
        SelectDeliveryPageRoutingModule
    ],
    declarations: [SelectDeliveryPage]
})
export class SelectDeliveryPageModule {
}
