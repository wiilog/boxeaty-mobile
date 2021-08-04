import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickEverythingPage } from './pick-everything.page';

const routes: Routes = [
  {
    path: '',
    component: PickEverythingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickEverythingPageRoutingModule {}
