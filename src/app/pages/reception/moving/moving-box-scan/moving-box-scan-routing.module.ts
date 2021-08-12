import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovingBoxScanPage } from './moving-box-scan.page';

const routes: Routes = [
  {
    path: '',
    component: MovingBoxScanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovingBoxScanPageRoutingModule {}
