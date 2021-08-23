import {Component, OnInit} from '@angular/core';
import {ViewWillEnter} from "@ionic/angular";
import {ApiService} from "@app/services/api.service";
import {NavService} from "@app/services/nav.service";
import {ToastService} from "@app/services/toast.service";

@Component({
    selector: 'app-moving-box-validate',
    templateUrl: './moving-box-validate.page.html',
    styleUrls: ['./moving-box-validate.page.scss'],
})
export class MovingBoxValidatePage implements ViewWillEnter, OnInit {

    public scannedBoxesAndCrates: Array<{ number: string; type: string }> = [];

    public selectedQuality = null;
    public selectedLocation = null;

    readonly LOCATION_SELECTABLE = 'location';
    readonly QUALITY_SELECTABLE = 'quality';

    constructor(private api: ApiService, private nav: NavService, private toast: ToastService) {
    }

    public ionViewWillEnter() {
        this.scannedBoxesAndCrates = this.nav.param<Array<{ number: string; type: string }>>('scannedBoxesAndCrates');
    }

    public ngOnInit() {
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

    public validate() {
        const params = {
            scannedBoxesAndCrates: this.scannedBoxesAndCrates,
            quality: this.selectedQuality.id,
            location: this.selectedLocation.id,
        };

        this.api.request(ApiService.MOVING, params, `Envoi des données en cours...`)
            .subscribe(() => {
                this.nav.pop(NavService.RECEPTION_MENU);
            });
    }

}
