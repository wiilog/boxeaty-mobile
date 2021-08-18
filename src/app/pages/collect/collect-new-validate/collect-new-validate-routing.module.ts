import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectNewValidatePage } from './collect-new-validate.page';

const routes: Routes = [
  {
    path: '',
    component: CollectNewValidatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectNewValidatePageRoutingModule {}
