import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonModule as BxModule} from '../../../common.module';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CollectValidatePageRoutingModule} from './collect-validate-routing.module';

import {CollectValidatePage} from './collect-validate.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CollectValidatePageRoutingModule,
        BxModule
    ],
    declarations: [CollectValidatePage]
})
export class CollectValidatePageModule {
}
