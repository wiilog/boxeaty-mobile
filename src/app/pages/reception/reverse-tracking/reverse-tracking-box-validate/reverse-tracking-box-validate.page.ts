import {Component, OnInit} from '@angular/core';
import {NavService} from '@app/services/nav.service';
import {ApiService} from '@app/services/api.service';
import {ToastService} from "@app/services/toast.service";

@Component({
    selector: 'app-reverse-tracking-box-validate',
    templateUrl: './reverse-tracking-box-validate.page.html',
    styleUrls: ['./reverse-tracking-box-validate.page.scss'],
})
export class ReverseTrackingBoxValidatePage implements OnInit {

    public crate: string;

    public boxes: Array<string>;

    public selectedQuality = null;
    public selectedLocation = null;

    readonly LOCATION_SELECTABLE = 'location';
    readonly QUALITY_SELECTABLE = 'quality';

    constructor(private navService: NavService, private api: ApiService, private toast: ToastService) {
    }

    public ngOnInit() {
    }

    public ionViewWillEnter() {
        this.boxes = this.navService.param<string>(`boxes`).split(`,`);
        this.crate = this.navService.param<string>(`crate`);
    }

    public locationScan(location) {
        this.api.request(ApiService.LOCATIONS, {}, `Vérification de l'emplacement en cours...`)
            .subscribe((locations) => {
                const scannedLocation = locations.find(l => l.name === location);
                if (scannedLocation) {
                    this.selectedLocation = {id: scannedLocation.id, name: scannedLocation.name};
                } else {
                    this.toast.show(`Cet emplacement n'existe pas`)
                }
            });
    }

    validate() {
        const params = {
            boxes: this.boxes.join(','),
            crate: this.crate,
            quality: this.selectedQuality.id,
            location: this.selectedLocation.id,
        };

        this.api.request(ApiService.REVERSE_TRACKING, params, `Envoi des données...`)
            .subscribe(() => {
                this.navService.pop(NavService.RECEPTIONS);
            });
    }
}
