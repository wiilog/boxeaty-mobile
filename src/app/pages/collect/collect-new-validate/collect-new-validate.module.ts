import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonModule as BxModule} from '../../../common.module';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CollectNewValidatePageRoutingModule} from './collect-new-validate-routing.module';

import {CollectNewValidatePage} from './collect-new-validate.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CollectNewValidatePageRoutingModule,
        BxModule
    ],
    declarations: [CollectNewValidatePage]
})
export class CollectNewValidatePageModule {
}
