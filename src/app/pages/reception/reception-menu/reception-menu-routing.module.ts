import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceptionMenuPage } from './reception-menu.page';

const routes: Routes = [
  {
    path: '',
    component: ReceptionMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceptionMenuPageRoutingModule {}
