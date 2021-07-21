import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectDeliveryPage } from './select-delivery.page';

const routes: Routes = [
  {
    path: '',
    component: SelectDeliveryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectDeliveryPageRoutingModule {}
