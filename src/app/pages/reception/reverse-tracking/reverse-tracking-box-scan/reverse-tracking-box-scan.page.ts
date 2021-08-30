import {Component} from '@angular/core';
import {NavService} from '@app/services/nav.service';
import {ApiService} from '@app/services/api.service';
import {ToastService} from '@app/services/toast.service';
import {Subscription} from 'rxjs';
import {ScannerService} from '@app/services/scanner.service';
import {ViewWillEnter, ViewWillLeave} from '@ionic/angular';

@Component({
    selector: 'app-reception-box-scan',
    templateUrl: './reverse-tracking-box-scan.page.html',
    styleUrls: ['./reverse-tracking-box-scan.page.scss'],
})
export class ReverseTrackingBoxScanPage implements ViewWillEnter, ViewWillLeave {

    public crate: string;
    public boxes: Array<{ boxNumber: string; boxType: string; boxId: number }>;

    private scanSubscription: Subscription;

    public constructor(private navService: NavService,
                       private scannerService: ScannerService,
                       private api: ApiService,
                       private toast: ToastService) {
    }

    public ionViewWillEnter(): void {
        this.crate = this.navService.param<string>(`crateNumber`);
        this.boxes = [];

        this.unsubscribeScan();
        this.scanSubscription = this.scannerService.scan$.subscribe(({barCode}) => {
            this.addBox(barCode);
        });
    }

    public ionViewWillLeave(): void {
        this.unsubscribeScan();
    }

    public deleteBox(box: { boxNumber: string; boxType: string; boxId: number }) {
        this.boxes = this.boxes.filter((b) => b.boxNumber !== box.boxNumber);
    }

    public addBox(box: string): void {
        this.api.request(ApiService.BOX, {box}).subscribe((chosen) => {
            if (chosen) {
                const already = this.boxes.find((b) => b.boxId === chosen.boxId);
                if (!already) {
                    this.boxes.push(chosen);
                }
            } else {
                this.toast.show('Aucune box disponible avec ce numéro.');
            }
        });
    }

    public next(): void {
        if (this.boxes.length > 0) {
            const params = {
                boxes: this.boxes.reduce((carry, b) => {
                    carry.push(b.boxId);
                    return carry;
                }, []).join(','),
                crate: this.crate
            };
            this.navService.push(NavService.REVERSE_TRACKING_BOX_VALIDATE, params);
        } else {
            this.toast.show('Veuillez ajouter au moins une box.');
        }
    }

    private unsubscribeScan(): void {
        if (this.scanSubscription && !this.scanSubscription.closed) {
            this.scanSubscription.unsubscribe();
            this.scanSubscription = undefined;
        }
    }

}
