import {NgModule} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';

import {DepositBoxesPageRoutingModule} from './deposit-boxes-routing.module';

import {DepositBoxesPage} from './deposit-boxes.page';
import {CommonModule} from "@app/common.module";

@NgModule({
    imports: [
        AngularCommonModule,
        DepositBoxesPageRoutingModule,
        CommonModule,
    ],
    declarations: [DepositBoxesPage]
})
export class DepositBoxesPageModule {
}
