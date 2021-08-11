import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonModule as BxModule} from '@app/common.module';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PreparationCratePickingPageRoutingModule} from './preparation-crate-picking-routing.module';

import {PreparationCratePickingPage} from './preparation-crate-picking.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PreparationCratePickingPageRoutingModule,
        BxModule,
    ],
    declarations: [PreparationCratePickingPage]
})
export class PreparationCratePickingPageModule {
}
