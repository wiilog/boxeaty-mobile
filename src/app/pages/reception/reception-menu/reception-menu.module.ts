import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceptionMenuPageRoutingModule } from './reception-menu-routing.module';

import { ReceptionMenuPage } from './reception-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceptionMenuPageRoutingModule
  ],
  declarations: [ReceptionMenuPage]
})
export class ReceptionMenuPageModule {}
