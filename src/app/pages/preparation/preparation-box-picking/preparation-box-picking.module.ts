import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonModule as BxModule} from '@app/common.module';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PreparationBoxPickingPageRoutingModule} from './preparation-box-picking-routing.module';

import {PreparationBoxPickingPage} from './preparation-box-picking.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PreparationBoxPickingPageRoutingModule,
        BxModule
    ],
    declarations: [PreparationBoxPickingPage]
})
export class PreparationBoxPickingPageModule {
}
