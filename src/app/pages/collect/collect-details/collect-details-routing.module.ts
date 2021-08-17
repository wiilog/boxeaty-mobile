import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectDetailsPage } from './collect-details.page';

const routes: Routes = [
  {
    path: '',
    component: CollectDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectDetailsPageRoutingModule {}
