import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoxPickingPage } from './box-picking.page';

const routes: Routes = [
  {
    path: '',
    component: BoxPickingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoxPickingPageRoutingModule {}
