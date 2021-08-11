import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PreparationListPage} from './preparation-list.page';

const routes: Routes = [
    {
        path: '',
        component: PreparationListPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PreparationListPageRoutingModule {
}
