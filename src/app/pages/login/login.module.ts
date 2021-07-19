import {NgModule} from '@angular/core';

import {LoginPageRoutingModule} from './login-routing.module';

import {LoginPage} from './login.page';
import {CommonModule} from "@app/common.module";

@NgModule({
    imports: [
        CommonModule,
        LoginPageRoutingModule,
    ],
    declarations: [LoginPage]
})
export class LoginPageModule {
}
