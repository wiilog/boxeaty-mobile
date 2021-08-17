import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonModule as BxModule} from '../../../common.module';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CollectListPageRoutingModule} from './collect-list-routing.module';

import {CollectListPage} from './collect-list.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CollectListPageRoutingModule,
        BxModule
    ],
    declarations: [CollectListPage]
})
export class CollectListPageModule {
}
