import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceptionCratePage } from './reception-crate.page';

const routes: Routes = [
  {
    path: '',
    component: ReceptionCratePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceptionCratePageRoutingModule {}
