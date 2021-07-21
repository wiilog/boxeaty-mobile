import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
    },
    {
        path: 'loading',
        loadChildren: () => import('./pages/loading/loading.module').then(m => m.LoadingPageModule)
    },
    {
        path: 'delivery-rounds',
        loadChildren: () => import('./pages/delivery/delivery-rounds/delivery-rounds.module').then(m => m.DeliveryRoundsPageModule)
    },
    {
        path: 'select-delivery',
        loadChildren: () => import('./pages/delivery/select-delivery/select-delivery.module').then(m => m.SelectDeliveryPageModule)
    },


];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
