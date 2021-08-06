import {Component, Output, EventEmitter} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {SignModalPage} from "@app/modals/sign-modal/sign-modal.page";

@Component({
    selector: 'bx-sign',
    templateUrl: './sign.component.html',
    styleUrls: ['./sign.component.scss'],
})
export class SignComponent {

    @Output()
    public done = new EventEmitter<string>();

    constructor(private modalController: ModalController) {
    }

    public async open() {
        const modal = await this.modalController.create({
            component: SignModalPage,
            cssClass: `sign-modal`,
        });

        modal.onDidDismiss().then(signature => {
            this.done.emit(signature.data);
        });

        return await modal.present();
    }

}
