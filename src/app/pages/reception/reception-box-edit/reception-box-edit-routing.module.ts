import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceptionBoxEditPage } from './reception-box-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ReceptionBoxEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceptionBoxEditPageRoutingModule {}
