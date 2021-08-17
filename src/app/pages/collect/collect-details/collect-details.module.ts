import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonModule as BxModule} from '../../../common.module';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CollectDetailsPageRoutingModule} from './collect-details-routing.module';

import {CollectDetailsPage} from './collect-details.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CollectDetailsPageRoutingModule,
        BxModule
    ],
    declarations: [CollectDetailsPage]
})
export class CollectDetailsPageModule {
}
