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
        path: 'reception-menu',
        loadChildren: () => import('./pages/reception/reception-menu/reception-menu.module').then(m => m.ReceptionMenuPageModule)
    },
    {
        path: 'reception-crate',
        loadChildren: () => import('./pages/reception/reception-crate/reception-crate.module').then(m => m.ReceptionCratePageModule)
    },
    {
        path: 'reception-box-scan',
        loadChildren: () => import('./pages/reception/reception-box-scan/reception-box-scan.module').then(m => m.ReceptionBoxScanPageModule)
    },
    {
        path: 'reception-box-edit',
        loadChildren: () => import('./pages/reception/reception-box-edit/reception-box-edit.module').then(m => m.ReceptionBoxEditPageModule)
    },
    {
        path: 'delivery-rounds',
        loadChildren: () => import('./pages/delivery/delivery-rounds/delivery-rounds.module').then(m => m.DeliveryRoundsPageModule)
    },
    {
        path: 'select-delivery',
        loadChildren: () => import('./pages/delivery/select-delivery/select-delivery.module').then(m => m.SelectDeliveryPageModule)
    },
    {
        path: 'preparations',
        loadChildren: () => import('./pages/preparation/list/list.module').then(m => m.ListPageModule)
    },
    {
        path: 'crates-to-prepare',
        loadChildren: () => import('./pages/preparation/crates-to-prepare/crates-to-prepare.module').then(m => m.CrateToPreparePageModule)
    },
    {
        path: 'pick-everything',
        loadChildren: () => import('./pages/delivery/pick-everything/pick-everything.module').then(m => m.PickEverythingPageModule)
    },
    {
        path: 'deposit-boxes',
        loadChildren: () => import('./pages/delivery/deposit-boxes/deposit-boxes.module').then(m => m.DepositBoxesPageModule)
    },
    {
        path: 'box-picking',
        loadChildren: () => import('./pages/preparation/box-picking/box-picking.module').then(m => m.BoxPickingPageModule)
    },
    {
        path: 'crate-picking',
        loadChildren: () => import('./pages/preparation/crate-picking/crate-picking.module').then(m => m.CratePickingPageModule)
    },
    {
        path: 'pick-everything',
        loadChildren: () => import('./pages/delivery/pick-everything/pick-everything.module').then(m => m.PickEverythingPageModule)
    },
  {
    path: 'delivery-sign',
    loadChildren: () => import('./pages/delivery/delivery-sign/delivery-sign.module').then( m => m.DeliverySignPageModule)
  },
  {
    path: 'sign-modal',
    loadChildren: () => import('./modals/sign-modal/sign-modal.module').then( m => m.SignModalPageModule)
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
