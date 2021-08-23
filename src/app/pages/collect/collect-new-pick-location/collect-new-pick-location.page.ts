import {Component} from '@angular/core';
import {ApiService} from '@app/services/api.service';
import {ToastService} from '@app/services/toast.service';
import {NavService} from '@app/services/nav.service';
import {ViewWillEnter} from '@ionic/angular';

@Component({
    selector: 'app-collect-new-pick-location',
    templateUrl: './collect-new-pick-location.page.html',
    styleUrls: ['./collect-new-pick-location.page.scss'],
})
export class CollectNewPickLocationPage implements ViewWillEnter {

    public static readonly LOCATION_TYPE_QUALITY: number = 4;

    public selectedLocation = null;

    public readonly LOCATION_SELECTABLE = 'location';

    private order?: number;

    public constructor(private api: ApiService, private toast: ToastService, private nav: NavService) {
    }

    public locationScan(location) {
        this.api.request(ApiService.LOCATIONS, {},
            `Vérification de l'emplacement en cours...`).subscribe((locations) => {
                const foundLocation = locations.findIndex((l) => (
                    l.name === location
                    && l.type === CollectNewPickLocationPage.LOCATION_TYPE_QUALITY
                ));
                if (foundLocation > -1) {
                    this.nav.push(NavService.COLLECT_NEW_DETAILS, {location});
                } else {
                    this.toast.show(`Cet emplacement n'existe pas ou n'est pas du bon type`);
                }
        });
    }

    public ionViewWillEnter(): void {
        this.order = this.nav.param<number>('order');
    }

}
