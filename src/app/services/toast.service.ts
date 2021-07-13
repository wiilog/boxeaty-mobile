import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(private toastController: ToastController) {
    }

    public async show(message: string) {
        if (!message) {
            return;
        }

        const toast = await this.toastController.create({
            message,
            duration: 5000,
        });

        await toast.present();
    }

}
