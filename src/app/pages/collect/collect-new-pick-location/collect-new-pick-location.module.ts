import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonModule as BxModule} from '../../../common.module';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CollectNewPickLocationPageRoutingModule} from './collect-new-pick-location-routing.module';

import {CollectNewPickLocationPage} from './collect-new-pick-location.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CollectNewPickLocationPageRoutingModule,
        BxModule
    ],
    declarations: [CollectNewPickLocationPage]
})
export class CollectNewPickLocationPageModule {
}
