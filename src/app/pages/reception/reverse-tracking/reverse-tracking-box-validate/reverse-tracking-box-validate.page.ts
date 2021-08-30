import {Component} from '@angular/core';
import {NavService} from '@app/services/nav.service';
import {ApiService} from '@app/services/api.service';
import {ToastService} from '@app/services/toast.service';
import {Subscription} from 'rxjs';
import {ViewWillEnter, ViewWillLeave} from '@ionic/angular';
import {ScannerService} from '@app/services/scanner.service';

@Component({
    selector: 'app-reverse-tracking-box-validate',
    templateUrl: './reverse-tracking-box-validate.page.html',
    styleUrls: ['./reverse-tracking-box-validate.page.scss'],
})
export class ReverseTrackingBoxValidatePage implements ViewWillEnter, ViewWillLeave {

    public crate: string;

    public boxes: Array<string>;

    public selectedQuality = null;
    public selectedLocation = null;

    readonly LOCATION_SELECTABLE = 'location';
    readonly QUALITY_SELECTABLE = 'quality';

    private scanSubscription: Subscription;

    public constructor(private navService: NavService,
                       private scannerService: ScannerService,
                       private api: ApiService,
                       private toast: ToastService) {
    }

    public ionViewWillEnter(): void {
        this.boxes = this.navService.param<string>(`boxes`).split(`,`);
        this.crate = this.navService.param<string>(`crate`);

        this.unsubscribeScan();
        this.scanSubscription = this.scannerService.scan$.subscribe(({barCode}) => {
            this.locationScan(barCode);
        });
    }

    public ionViewWillLeave(): void {
        this.unsubscribeScan();
    }

    public locationScan(location: string): void {
        this.api.request(ApiService.LOCATIONS, {}, `Vérification de l'emplacement`)
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
                this.navService.pop(NavService.RECEPTION_MENU);
            });
    }

    private unsubscribeScan(): void {
        if (this.scanSubscription && !this.scanSubscription.closed) {
            this.scanSubscription.unsubscribe();
            this.scanSubscription = undefined;
        }
    }
}
