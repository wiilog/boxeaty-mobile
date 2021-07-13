import {NgModule} from '@angular/core';

import {CommonModule as AngularCommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {FieldComponent} from './components/field/field.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [FieldComponent],
    imports: [
        AngularCommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    exports: [
        FieldComponent,
        FormsModule,
        ReactiveFormsModule
    ],
})
export class CommonModule {
}
