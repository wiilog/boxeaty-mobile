import {NgModule} from '@angular/core';

import {CommonModule as AngularCommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {HttpClientModule} from '@angular/common/http';
import {FieldComponent} from './components/field/field.component';
import {HeaderComponent} from '@app/components/header/header.component';
import {SectionComponent} from '@app/components/section/section.component';
import {CardWrapperComponent} from '@app/components/card-wrapper/card-wrapper.component';

@NgModule({
    declarations: [FieldComponent, HeaderComponent, SectionComponent, CardWrapperComponent],
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
        CardWrapperComponent,
        FormsModule,
        ReactiveFormsModule
    ],
})
export class CommonModule {
}
