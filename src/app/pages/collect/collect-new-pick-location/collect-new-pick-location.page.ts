import {Component, OnInit} from '@angular/core';
import {ApiService} from "@app/services/api.service";
import {ToastService} from "@app/services/toast.service";
import {NavService} from "@app/services/nav.service";
import {ViewWillEnter} from "@ionic/angular";

@Component({
    selector: 'app-collect-new-pick-location',
    templateUrl: './collect-new-pick-location.page.html',
    styleUrls: ['./collect-new-pick-location.page.scss'],
})
export class CollectNewPickLocationPage implements ViewWillEnter, OnInit {

    public selectedLocation = null;

    readonly LOCATION_SELECTABLE = 'location';

    constructor(private api: ApiService, private toast: ToastService, private nav: NavService) {
    }

    ngOnInit() {
    }

    public ionViewWillEnter() {
    }

    public locationScan(location) {
        this.api.request(ApiService.LOCATIONS, {},
            `Vérification de l'emplacement en cours...`).subscribe((locations) => {
                const findedLocation = locations.findIndex((l) => l.name === location && l.type === 4);
                if(findedLocation) {
                    this.nav.push(NavService.COLLECT_NEW_DETAILS, {location});
                } else {
                    this.toast.show(`Cet emplacement n'existe pas ou n'est pas du bon type`);
                }
        });
    }

}
