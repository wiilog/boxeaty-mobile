import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReverseTrackingBoxScanPage } from './reverse-tracking-box-scan.page';

const routes: Routes = [
  {
    path: '',
    component: ReverseTrackingBoxScanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceptionBoxScanPageRoutingModule {}
