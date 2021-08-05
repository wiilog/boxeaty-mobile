import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrateContentPage } from './crate-content.page';

const routes: Routes = [
  {
    path: '',
    component: CrateContentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrateContentPageRoutingModule {}
