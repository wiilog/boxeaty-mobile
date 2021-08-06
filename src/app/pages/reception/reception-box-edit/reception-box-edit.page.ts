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

    public boxes: Array<string>;

    public selectedQuality = null;
    public selectedLocation = null;

    readonly LOCATION_SELECTABLE = 'location';
    readonly QUALITY_SELECTABLE = 'quality';

    constructor(private navService: NavService, private api: ApiService, private loader: LoadingController) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.boxes = this.navService.param<string>(`boxes`).split(`,`);
        this.crate = this.navService.param<string>(`crate`);
    }

    validate() {
        const params = {
            boxes: this.boxes.join(','),
            crate: this.crate,
            quality: this.selectedQuality.id,
            location: this.selectedLocation.id,
        };

        this.api.request(ApiService.REVERSE_TRACKING, params, `Envoi des données`).subscribe(() => {
            this.navService.pop(NavService.RECEPTIONS);
        })
    }
}
