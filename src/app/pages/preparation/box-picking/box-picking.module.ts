import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonModule as BxModule} from '../../../common.module';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {BoxPickingPageRoutingModule} from './box-picking-routing.module';

import {BoxPickingPage} from './box-picking.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BoxPickingPageRoutingModule,
        BxModule
    ],
    declarations: [BoxPickingPage]
})
export class BoxPickingPageModule {
}
