import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectNewPickLocationPage } from './collect-new-pick-location.page';

const routes: Routes = [
  {
    path: '',
    component: CollectNewPickLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectNewPickLocationPageRoutingModule {}
