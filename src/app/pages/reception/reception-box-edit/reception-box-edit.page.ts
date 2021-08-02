import {Component, OnInit} from '@angular/core';
import {NavService} from '@app/services/nav.service';
import {ApiService} from '@app/services/api.service';
import {LoadingController} from '@ionic/angular';

@Component({
    selector: 'app-reception-box-edit',
    templateUrl: './reception-box-edit.page.html',
    styleUrls: ['./reception-box-edit.page.scss'],
})
export class ReceptionBoxEditPage implements OnInit {

    public crate: string;

    public boxes: Array<{boxNumber: string; boxType: string; boxId: number}>;

    public selectedQuality = null;
    public selectedLocation = null;

    readonly LOCATION_SELECTABLE = 'location';
    readonly QUALITY_SELECTABLE = 'quality';

    constructor(private navService: NavService, private api: ApiService, private loader: LoadingController) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.navService.readParams((param) => {
            this.boxes = param.boxes.split(',');
            this.crate = param.crate;
        });
    }

    validate() {
        this.loader.create({
            message: 'Veuillez patienter...',
        }).then((loader) => {
            loader.present().then(() => {
                const params = {
                    boxes: this.boxes.join(','),
                    crate: this.crate,
                    quality: this.selectedQuality.id,
                    location: this.selectedLocation.id,
                };
                this.api.request(ApiService.REVERSE_TRACKING, params).subscribe(() => {
                    loader.dismiss();
                    this.navService.setRoot(NavService.RECEPTION_MENU);
                }, () => {
                    loader.dismiss();
                });
            });
        });
    }
}