import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PreparationCrateContentPage} from './preparation-crate-content.page';

const routes: Routes = [
    {
        path: '',
        component: PreparationCrateContentPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PreparationCrateContentPageRoutingModule {
}
