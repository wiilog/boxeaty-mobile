import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CratesToPreparePage } from './crates-to-prepare.page';

const routes: Routes = [
  {
    path: '',
    component: CratesToPreparePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrateToPreparePageRoutingModule {}
