import {NgModule} from '@angular/core';

import {CommonModule as AngularCommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {HttpClientModule} from '@angular/common/http';
import {FieldComponent} from './components/field/field.component';
import {HeaderComponent} from "@app/components/header/header.component";
import {SectionComponent} from "@app/components/section/section.component";

@NgModule({
    declarations: [FieldComponent, HeaderComponent, SectionComponent],
    imports: [
        AngularCommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    exports: [
        FieldComponent,
        HeaderComponent,
        SectionComponent,
        FormsModule,
        ReactiveFormsModule
    ],
})
export class CommonModule {
}
