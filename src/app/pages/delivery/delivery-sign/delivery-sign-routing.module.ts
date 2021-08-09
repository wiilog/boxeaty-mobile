import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DeliverySignPage} from './delivery-sign.page';

const routes: Routes = [
    {
        path: '',
        component: DeliverySignPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DeliverySignPageRoutingModule {
}
