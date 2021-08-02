import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceptionBoxScanPage } from './reception-box-scan.page';

const routes: Routes = [
  {
    path: '',
    component: ReceptionBoxScanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceptionBoxScanPageRoutingModule {}
