import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DepositBoxesPage} from './deposit-boxes.page';

const routes: Routes = [
    {
        path: '',
        component: DepositBoxesPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DepositBoxesPageRoutingModule {
}
