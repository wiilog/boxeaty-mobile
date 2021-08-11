import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PreparationBoxPickingPage} from './preparation-box-picking.page';

const routes: Routes = [
    {
        path: '',
        component: PreparationBoxPickingPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PreparationBoxPickingPageRoutingModule {
}
