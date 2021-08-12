import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReverseTrackingBoxValidatePage } from './reverse-tracking-box-validate.page';

const routes: Routes = [
  {
    path: '',
    component: ReverseTrackingBoxValidatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceptionBoxEditPageRoutingModule {}
