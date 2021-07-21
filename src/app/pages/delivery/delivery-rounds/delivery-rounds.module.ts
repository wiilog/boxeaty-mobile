import {NgModule} from '@angular/core';

import {DeliveryRoundsPageRoutingModule} from './delivery-rounds-routing.module';

import {DeliveryRoundsPage} from './delivery-rounds.page';
import {CommonModule} from "@app/common.module";
import {CommonModule as AngularCommonModule} from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        AngularCommonModule,
        DeliveryRoundsPageRoutingModule
    ],
    declarations: [DeliveryRoundsPage]
})
export class DeliveryRoundsPageModule {
}
