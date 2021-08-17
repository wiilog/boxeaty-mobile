import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectValidatePage } from './collect-validate.page';

const routes: Routes = [
  {
    path: '',
    component: CollectValidatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectValidatePageRoutingModule {}
