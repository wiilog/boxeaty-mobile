import {Component} from '@angular/core';
import {ViewWillEnter, ViewWillLeave} from '@ionic/angular';
import {ApiService} from '@app/services/api.service';
import {NavService} from '@app/services/nav.service';
import {ToastService} from '@app/services/toast.service';
import {Subscription} from 'rxjs';
import {ScannerService} from '@app/services/scanner.service';

@Component({
    selector: 'app-moving-box-validate',
    templateUrl: './moving-box-validate.page.html',
    styleUrls: ['./moving-box-validate.page.scss'],
})
export class MovingBoxValidatePage implements ViewWillEnter, ViewWillLeave {

    public scannedBoxesAndCrates: Array<{ number: string; type: string }> = [];

    public selectedQuality = null;
    public selectedLocation = null;

    public readonly LOCATION_SELECTABLE = 'location';
    public readonly QUALITY_SELECTABLE = 'quality';

    private scanSubscription: Subscription;

    public constructor(private api: ApiService,
                       private scannerService: ScannerService,
                       private nav: NavService,
                       private toast: ToastService) {
    }

    public ionViewWillEnter() {
        this.scannedBoxesAndCrates = this.nav.param<Array<{ number: string; type: string }>>('scannedBoxesAndCrates');

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
                    this.toast.show(`Cet emplacement n'existe pas`);
                }
            });
    }

    public validate() {
        const params = {
            scannedBoxesAndCrates: this.scannedBoxesAndCrates,
            quality: this.selectedQuality.id,
            location: this.selectedLocation.id,
        };

        this.api.request(ApiService.MOVING, params, `Envoi des données`)
            .subscribe(() => {
                this.nav.pop(NavService.RECEPTION_MENU);
            });
    }

    private unsubscribeScan(): void {
        if (this.scanSubscription && !this.scanSubscription.closed) {
            this.scanSubscription.unsubscribe();
            this.scanSubscription = undefined;
        }
    }

}
