import {Component, ViewChild} from '@angular/core';
import {ViewWillEnter} from '@ionic/angular';
import SignaturePad from 'signature_pad';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-sign-modal',
    templateUrl: './sign-modal.page.html',
    styleUrls: ['./sign-modal.page.scss'],
})
export class SignModalPage implements ViewWillEnter {

    @ViewChild('canvas', {static: true}) element;

    private pad: SignaturePad;

    constructor(private modalController: ModalController) {
    }

    public ionViewWillEnter() {
        this.pad = new SignaturePad(this.element.nativeElement);
    }

    public validate() {
        this.modalController.dismiss(this.pad.toDataURL());
    }

}
