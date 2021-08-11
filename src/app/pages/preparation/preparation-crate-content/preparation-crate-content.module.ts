import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonModule as BxModule} from '@app/common.module';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PreparationCrateContentPageRoutingModule} from './preparation-crate-content-routing.module';

import {PreparationCrateContentPage} from './preparation-crate-content.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PreparationCrateContentPageRoutingModule,
        BxModule
    ],
    declarations: [PreparationCrateContentPage]
})
export class PreparationCrateContentPageModule {
}
