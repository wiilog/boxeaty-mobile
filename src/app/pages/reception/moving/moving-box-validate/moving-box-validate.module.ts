import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonModule as BxModule} from '../../../../common.module';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MovingBoxValidatePageRoutingModule} from './moving-box-validate-routing.module';

import {MovingBoxValidatePage} from './moving-box-validate.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MovingBoxValidatePageRoutingModule,
        BxModule
    ],
    declarations: [MovingBoxValidatePage]
})
export class MovingBoxValidatePageModule {
}
