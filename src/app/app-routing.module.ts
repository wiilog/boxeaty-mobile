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
        path: 'reverse-tracking-crate',
        loadChildren: () => import('./pages/reception/reverse-tracking/reverse-tracking-crate/reverse-tracking-crate.module').then(m => m.ReceptionCratePageModule)
    },
    {
        path: 'reverse-tracking-box-scan',
        loadChildren: () => import('./pages/reception/reverse-tracking/reverse-tracking-box-scan/reverse-tracking-box-scan.module').then(m => m.ReceptionBoxScanPageModule)
    },
    {
        path: 'reverse-tracking-box-validate',
        loadChildren: () => import('./pages/reception/reverse-tracking/reverse-tracking-box-validate/reverse-tracking-box-validate.module').then(m => m.ReceptionBoxEditPageModule)
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
        loadChildren: () => import('./pages/preparation/preparation-list/preparation-list.module').then(m => m.PreparationListPageModule)
    },
    {
        path: 'crates-to-prepare',
        loadChildren: () => import('./pages/preparation/preparation-crates-to-prepare/preparation-crates-to-prepare.module').then(m => m.PreparationCrateToPreparePageModule)
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
        loadChildren: () => import('./pages/preparation/preparation-box-picking/preparation-box-picking.module').then(m => m.PreparationBoxPickingPageModule)
    },
    {
        path: 'crate-picking',
        loadChildren: () => import('./pages/preparation/preparation-crate-picking/preparation-crate-picking.module').then(m => m.PreparationCratePickingPageModule)
    },
    {
        path: 'pick-everything',
        loadChildren: () => import('./pages/delivery/pick-everything/pick-everything.module').then(m => m.PickEverythingPageModule)
    },
    {
        path: 'delivery-sign',
        loadChildren: () => import('./pages/delivery/delivery-sign/delivery-sign.module').then(m => m.DeliverySignPageModule)
    },
    {
        path: 'sign-modal',
        loadChildren: () => import('./modals/sign-modal/sign-modal.module').then(m => m.SignModalPageModule)
    },
    {
        path: 'crate-content',
        loadChildren: () => import('./pages/preparation/preparation-crate-content/preparation-crate-content.module').then(m => m.PreparationCrateContentPageModule)
    },
    {
        path: 'moving-box-validate',
        loadChildren: () => import('./pages/reception/moving/moving-box-validate/moving-box-validate.module').then(m => m.MovingBoxValidatePageModule)
    },
    {
        path: 'moving-box-scan',
        loadChildren: () => import('./pages/reception/moving/moving-box-scan/moving-box-scan.module').then(m => m.MovingBoxScanPageModule)
    },
    {
        path: 'collects',
        loadChildren: () => import('./pages/collect/collect-list/collect-list.module').then(m => m.CollectListPageModule)
    },
    {
        path: 'collect-details',
        loadChildren: () => import('./pages/collect/collect-details/collect-details.module').then(m => m.CollectDetailsPageModule)
    },
    {
        path: 'collect-validate',
        loadChildren: () => import('./pages/collect/collect-validate/collect-validate.module').then(m => m.CollectValidatePageModule)
    },
    {
        path: 'collect-new-details',
        loadChildren: () => import('./pages/collect/collect-new-details/collect-new-details.module').then(m => m.CollectNewDetailsPageModule)
    },
    {
        path: 'collect-new-validate',
        loadChildren: () => import('./pages/collect/collect-new-validate/collect-new-validate.module').then(m => m.CollectNewValidatePageModule)
    },
    {
        path: 'collect-new-pick-location',
        loadChildren: () => import('./pages/collect/collect-new-pick-location/collect-new-pick-location.module').then(m => m.CollectNewPickLocationPageModule)
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
