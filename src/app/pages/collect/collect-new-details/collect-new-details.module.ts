import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonModule as BxModule} from '../../../common.module';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CollectNewDetailsPageRoutingModule} from './collect-new-details-routing.module';

import {CollectNewDetailsPage} from './collect-new-details.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CollectNewDetailsPageRoutingModule,
        BxModule
    ],
    declarations: [CollectNewDetailsPage]
})
export class CollectNewDetailsPageModule {
}
