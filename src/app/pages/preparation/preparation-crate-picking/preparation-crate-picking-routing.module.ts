import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PreparationCratePickingPage} from './preparation-crate-picking.page';

const routes: Routes = [
    {
        path: '',
        component: PreparationCratePickingPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PreparationCratePickingPageRoutingModule {
}
