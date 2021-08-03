import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonModule as BxModule} from '../../../common.module';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CratePickingPageRoutingModule} from './crate-picking-routing.module';

import {CratePickingPage} from './crate-picking.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CratePickingPageRoutingModule,
        BxModule,
    ],
    declarations: [CratePickingPage]
})
export class CratePickingPageModule {
}
