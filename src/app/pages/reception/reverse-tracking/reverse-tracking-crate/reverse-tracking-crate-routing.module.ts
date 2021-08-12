import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReverseTrackingCratePage } from './reverse-tracking-crate.page';

const routes: Routes = [
  {
    path: '',
    component: ReverseTrackingCratePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceptionCratePageRoutingModule {}
