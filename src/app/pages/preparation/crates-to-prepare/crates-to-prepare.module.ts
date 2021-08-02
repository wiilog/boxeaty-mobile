import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonModule as BxModule} from '../../../common.module';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CrateToPreparePageRoutingModule} from './crates-to-prepare-routing.module';

import {CratesToPreparePage} from './crates-to-prepare.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CrateToPreparePageRoutingModule,
        BxModule
    ],
    declarations: [CratesToPreparePage]
})
export class CrateToPreparePageModule {
}
