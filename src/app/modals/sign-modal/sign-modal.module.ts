import {NgModule} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';

import {SignModalPageRoutingModule} from './sign-modal-routing.module';

import {SignModalPage} from './sign-modal.page';
import {CommonModule} from "@app/common.module";

@NgModule({
    imports: [
        AngularCommonModule,
        SignModalPageRoutingModule,
        CommonModule
    ],
    declarations: [SignModalPage]
})
export class SignModalPageModule {
}
