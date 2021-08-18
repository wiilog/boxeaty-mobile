import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectNewDetailsPage } from './collect-new-details.page';

const routes: Routes = [
  {
    path: '',
    component: CollectNewDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectNewDetailsPageRoutingModule {}
