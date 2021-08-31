import {Component} from '@angular/core';
import {ApiService} from '@app/services/api.service';
import {ToastService} from '@app/services/toast.service';
import {NavService} from '@app/services/nav.service';
import {ViewWillEnter, ViewWillLeave} from '@ionic/angular';
import {ScannerService} from '@app/services/scanner.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-collect-new-pick-location',
    templateUrl: './collect-new-pick-location.page.html',
    styleUrls: ['./collect-new-pick-location.page.scss'],
})
export class CollectNewPickLocationPage implements ViewWillEnter, ViewWillLeave {

    public static readonly LOCATION_TYPE_QUALITY: number = 4;

    public selectedLocation = null;

    public readonly LOCATION_SELECTABLE = 'location';

    private order?: number;

    private scanSubscription: Subscription;

    public constructor(private api: ApiService,
                       private scannerService: ScannerService,
                       private toast: ToastService,
                       private nav: NavService) {
    }

    public ionViewWillEnter(): void {
        this.order = this.nav.param<number>('order');

        this.unsubscribeScan();
        this.scanSubscription = this.scannerService.scan$.subscribe(({barCode}) => {
            this.locationScan(barCode);
        });
    }

    public ionViewWillLeave(): void {
        this.unsubscribeScan();
    }

    public locationScan(location: string): void {
        this.api.request(ApiService.LOCATIONS, {},
            `Vérification de l'emplacement`).subscribe((locations) => {
                const foundLocation = locations.findIndex((l) => (
                    l.name === location
                    && l.type === CollectNewPickLocationPage.LOCATION_TYPE_QUALITY
                ));
                if (foundLocation > -1) {
                    this.nav.push(NavService.COLLECT_NEW_DETAILS, {
                        order: this.order,
                        location
                    });
                } else {
                    this.toast.show(`Cet emplacement n'existe pas ou n'est pas du bon type`);
                }
        });
    }

    private unsubscribeScan(): void {
        if (this.scanSubscription && !this.scanSubscription.closed) {
            this.scanSubscription.unsubscribe();
            this.scanSubscription = undefined;
        }
    }

}
