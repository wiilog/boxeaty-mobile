import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CommonModule as BxModule} from '../../../common.module';

import {IonicModule} from '@ionic/angular';

import {PreparationListPageRoutingModule} from './preparation-list-routing.module';

import {PreparationListPage} from './preparation-list.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PreparationListPageRoutingModule,
        BxModule
    ],
    declarations: [PreparationListPage]
})
export class PreparationListPageModule {
}
