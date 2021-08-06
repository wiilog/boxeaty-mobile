import {NgModule} from '@angular/core';

import {CommonModule as AngularCommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {HttpClientModule} from '@angular/common/http';
import {FieldComponent} from './components/field/field.component';
import {HeaderComponent} from '@app/components/header/header.component';
import {SectionComponent} from '@app/components/section/section.component';
import {CardWrapperComponent} from '@app/components/card-wrapper/card-wrapper.component';
import {CardClientComponent} from '@app/components/card-client/card-client.component';
import {CardContentComponent} from '@app/components/card-content/card-content.component';
import {CardOrderComponent} from '@app/components/card-order/card-order.component';
import {ItemComponent} from '@app/components/item/item.component';
import {ButtonComponent} from '@app/components/button/button.component';
import {CardOrderDetailComponent} from '@app/components/card-order-detail/card-order-detail.component';
import {SelectableComponent} from './components/selectable/selectable.component';
import {IonicSelectableComponent, IonicSelectableModule} from 'ionic-selectable';
import {EmptyComponent} from '@app/components/empty/empty.component';
import {LengthPipe} from './pipes/length/length.pipe';
import {EntriesPipe} from './pipes/entries/entries.pipe';
import {ValuesPipe} from './pipes/values/values.pipe';
import {CardDeliveryComponent} from "@app/components/card-delivery/card-delivery.component";
import {SignComponent} from "@app/components/sign/sign.component";
import {PhotoComponent} from "@app/components/photo/photo.component";

@NgModule({
    declarations: [
        FieldComponent,
        HeaderComponent,
        SectionComponent,
        CardWrapperComponent,
        CardClientComponent,
        CardContentComponent,
        CardOrderComponent,
        ItemComponent,
        ButtonComponent,
        SelectableComponent,
        CardOrderDetailComponent,
        EmptyComponent,
        LengthPipe,
        EntriesPipe,
        ValuesPipe,
        CardDeliveryComponent,
        SignComponent,
        PhotoComponent,
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
        CardClientComponent,
        CardContentComponent,
        CardOrderComponent,
        ItemComponent,
        ButtonComponent,
        CardOrderDetailComponent,
        SelectableComponent,
        IonicSelectableComponent,
        EmptyComponent,
        LengthPipe,
        EntriesPipe,
        ValuesPipe,
        CardDeliveryComponent,
        SignComponent,
        PhotoComponent,
    ]
})
export class CommonModule {
}
