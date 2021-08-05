import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonModule as BxModule} from '../../../common.module';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CrateContentPageRoutingModule} from './crate-content-routing.module';

import {CrateContentPage} from './crate-content.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CrateContentPageRoutingModule,
        BxModule
    ],
    declarations: [CrateContentPage]
})
export class CrateContentPageModule {
}
