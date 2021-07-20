import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryRoundsPage } from './delivery-rounds.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryRoundsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryRoundsPageRoutingModule {}
