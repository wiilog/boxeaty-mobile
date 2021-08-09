import {NgModule} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';

import {DeliverySignPageRoutingModule} from './delivery-sign-routing.module';

import {DeliverySignPage} from './delivery-sign.page';
import {CommonModule} from "@app/common.module";

@NgModule({
    imports: [
        AngularCommonModule,
        DeliverySignPageRoutingModule,
        CommonModule,
    ],
    declarations: [DeliverySignPage]
})
export class DeliverySignPageModule {
}
