import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectListPage } from './collect-list.page';

const routes: Routes = [
  {
    path: '',
    component: CollectListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectListPageRoutingModule {}
