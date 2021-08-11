import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonModule as BxModule} from '@app/common.module';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PreparationCrateToPreparePageRoutingModule} from './preparation-crates-to-prepare-routing.module';

import {PreparationCratesToPreparePage} from './preparation-crates-to-prepare.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PreparationCrateToPreparePageRoutingModule,
        BxModule
    ],
    declarations: [PreparationCratesToPreparePage]
})
export class PreparationCrateToPreparePageModule {
}
