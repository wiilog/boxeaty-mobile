import {Component} from '@angular/core';
import {LoadingController, ViewWillEnter} from '@ionic/angular';
import {NavService} from '@app/services/nav.service';
import {ApiService} from '@app/services/api.service';
import {ToastService} from '@app/services/toast.service';
import {Stream} from '@app/utils/stream';

@Component({
    selector: 'bx-box-picking',
    templateUrl: './box-picking.page.html',
    styleUrls: ['./box-picking.page.scss'],
})
export class BoxPickingPage implements ViewWillEnter {

    public crate: string;
    public preparation: string;

    public availableBoxes = {};

    constructor(private nav: NavService, private api: ApiService,
                private loader: LoadingController, private toastService: ToastService) {
    }

    public ionViewWillEnter() {
        this.nav.readParams((param) => {
            this.crate = param.crate;
            this.preparation = param.preparation;
            this.getAvailableBoxes(this.preparation);
        });
    }

    public scanBox(box) {
        const values = Object.values(this.availableBoxes);
        const boxes = Stream.flatten(values);
        if(boxes.includes(box)) {
            console.log('ok');
        } else {
            this.toastService.show('La Box <strong>' + box + '</strong> n\'est pas présente sur les emplacements');
        }
    }

    private getAvailableBoxes(preparation) {
        this.loader.create({
            message: 'Chargement des Box disponibles en cours...',
        }).then((loader) => {
            loader.present().then(() => {
                this.api.request(ApiService.AVAILABLE_BOXES, {preparation}).subscribe((availableBoxes) => {
                    loader.dismiss();
                    this.availableBoxes = availableBoxes;
                }, () => {
                    loader.dismiss();
                });
            });
        });
    }
}
