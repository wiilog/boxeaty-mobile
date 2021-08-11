import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PreparationCratesToPreparePage} from './preparation-crates-to-prepare.page';

const routes: Routes = [
    {
        path: '',
        component: PreparationCratesToPreparePage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PreparationCrateToPreparePageRoutingModule {
}
