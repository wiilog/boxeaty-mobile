import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {CommonModule} from './common.module';

import {LOCALE_ID} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {SQLite} from '@ionic-native/sqlite/ngx';

registerLocaleData(localeFr, 'fr');

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, FormsModule, CommonModule],
    providers: [
        SQLite,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {
            provide: LOCALE_ID,
            useValue: 'fr'
        }
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
