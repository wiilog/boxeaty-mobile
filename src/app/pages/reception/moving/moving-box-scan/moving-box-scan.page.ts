import {Component} from '@angular/core';
import {ViewWillEnter, ViewWillLeave} from '@ionic/angular';
import {ApiService} from '@app/services/api.service';
import {ToastService} from '@app/services/toast.service';
import {NavService} from '@app/services/nav.service';
import {Subscription} from 'rxjs';
import {ScannerService} from '@app/services/scanner.service';

@Component({
    selector: 'app-moving-box-scan',
    templateUrl: './moving-box-scan.page.html',
    styleUrls: ['./moving-box-scan.page.scss'],
})
export class MovingBoxScanPage implements ViewWillEnter, ViewWillLeave {

    public scannedBoxesAndCrates: Array<{ number: string; type: string }> = [];

    private scanSubscription: Subscription;

    public constructor(private api: ApiService,
                       private scannerService: ScannerService,
                       private toastService: ToastService,
                       private nav: NavService) {
    }

    public ionViewWillEnter() {
        this.unsubscribeScan();
        this.scanSubscription = this.scannerService.scan$.subscribe(({barCode}) => {
            this.scan(barCode);
        });
    }

    public ionViewWillLeave(): void {
        this.unsubscribeScan();
    }

    public scan(object: string): void {
        const index = this.scannedBoxesAndCrates.findIndex((o) => o.number === object);
        if(index === -1) {
            this.api.request(ApiService.BOX_INFORMATIONS, {
                box: object
            }, 'Ajout de la Box/caisse').subscribe((result) => {
                const {number, type} = result.data || {};
                if(number && type) {
                    this.scannedBoxesAndCrates.push({number, type});
                } else {
                    this.toastService.show(`Cette Box / Caisse n'existe pas`);
                }
            });
        } else {
            this.toastService.show(`Cette Box / Caisse a déjà été scannée`);
        }
    }

    public next() {
        this.nav.push(NavService.MOVING_BOX_VALIDATE, {scannedBoxesAndCrates: this.scannedBoxesAndCrates});
    }

    public delete(index) {
        this.scannedBoxesAndCrates.splice(index, 1);
        this.toastService.show(`La Box / Caisse a bien été supprimée`);
    }

    private unsubscribeScan(): void {
        if (this.scanSubscription && !this.scanSubscription.closed) {
            this.scanSubscription.unsubscribe();
            this.scanSubscription = undefined;
        }
    }
}
