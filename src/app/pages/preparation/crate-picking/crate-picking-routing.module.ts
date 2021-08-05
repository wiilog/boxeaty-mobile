import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CratePickingPage } from './crate-picking.page';

const routes: Routes = [
  {
    path: '',
    component: CratePickingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CratePickingPageRoutingModule {}
