import {NgModule} from '@angular/core';

import {CommonModule as AngularCommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {HttpClientModule} from '@angular/common/http';
import {FieldComponent} from './components/field/field.component';
import {HeaderComponent} from '@app/components/header/header.component';
import {SectionComponent} from '@app/components/section/section.component';
import {CardWrapperComponent} from '@app/components/card-wrapper/card-wrapper.component';
import {CardComponent} from '@app/components/card/card.component';
import {CardClientComponent} from '@app/components/card-client/card-client.component';
import {CardContentComponent} from '@app/components/card-content/card-content.component';
import {CardOrderComponent} from '@app/components/card-order/card-order.component';
import {ItemComponent} from "@app/components/item/item.component";
import {ButtonComponent} from "@app/components/button/button.component";
import {CardOrderDetailComponent} from "@app/components/card-order-detail/card-order-detail.component";
import {SelectableComponent} from "./components/selectable/selectable.component";
import {IonicSelectableComponent, IonicSelectableModule} from "ionic-selectable";

@NgModule({
    declarations: [
        FieldComponent,
        HeaderComponent,
        SectionComponent,
        CardWrapperComponent,
        CardComponent,
        CardClientComponent,
        CardContentComponent,
        CardOrderComponent,
        ItemComponent,
        ButtonComponent,
        SelectableComponent,
        CardOrderDetailComponent,
    ],
    imports: [
        AngularCommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        HttpClientModule,
        IonicSelectableModule
    ],
    exports: [
        FieldComponent,
        HeaderComponent,
        SectionComponent,
        CardWrapperComponent,
        FormsModule,
        ReactiveFormsModule,
        CardComponent,
        CardClientComponent,
        CardContentComponent,
        CardOrderComponent,
        ItemComponent,
        ButtonComponent,
        CardOrderDetailComponent,
        SelectableComponent,
        IonicSelectableComponent
    ],
})
export class CommonModule {
}
