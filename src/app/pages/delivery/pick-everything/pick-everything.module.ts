import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickEverythingPageRoutingModule } from './pick-everything-routing.module';

import { PickEverythingPage } from './pick-everything.page';
import {CommonModule} from "@app/common.module";

@NgModule({
    imports: [
        AngularCommonModule,
        PickEverythingPageRoutingModule,
        CommonModule
    ],
  declarations: [PickEverythingPage]
})
export class PickEverythingPageModule {}
