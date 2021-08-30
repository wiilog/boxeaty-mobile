import {Component, Input} from '@angular/core';
import {StorageService} from '@app/services/storage.service';
import {Depository} from '@app/entities/depository';
import {ApiService} from '@app/services/api.service';
import {NavService} from '@app/services/nav.service';
import {ToastService} from '@app/services/toast.service';
import {Subscription} from 'rxjs';
import {ViewWillEnter, ViewWillLeave} from '@ionic/angular';
import {ScannerService} from '@app/services/scanner.service';

@Component({
  selector: 'app-reception-crate',
  templateUrl: './reverse-tracking-crate.page.html',
  styleUrls: ['./reverse-tracking-crate.page.scss'],
})
export class ReverseTrackingCratePage implements ViewWillEnter, ViewWillLeave {

    @Input()
    public preparing: string;

    public depositories: Array<{label: string; value: number}> = null;
    public crates: Array<{crateNumber: string; crateLocation: string; crateType: string; crateId: number}> = null;

    private scanSubscription: Subscription;

    public constructor(private storage: StorageService,
                       private scannerService: ScannerService,
                       private api: ApiService,
                       private nav: NavService,
                       private toast: ToastService) {
    }

    public ionViewWillEnter(): void {
        this.storage.get<Depository>('depository').then(depositories => {
            this.depositories = depositories.map(depository => ({
                value: depository.id,
                label: depository.name,
            }));
        });

        this.unsubscribeScan();
        this.scanSubscription = this.scannerService.scan$.subscribe(({barCode}) => {
            this.goToCrate(barCode);
        });
    }

    public ionViewWillLeave(): void {
        this.unsubscribeScan();
    }

    public depositoryChanged(depository) {
        this.api.request(ApiService.CRATES, {depository}).subscribe((crates) => {
            this.crates = crates;
        });
    }

    public goToCrate(crateNumber: string) {
        const crate = this.crates.find((c) => c.crateNumber === crateNumber);
        if (crate) {
            this.nav.push(NavService.REVERSE_TRACKING_BOX_SCAN, {crateNumber});
        } else {
            this.toast.show('La caisse flashée n\'existe pas dans la liste actuelle.');
        }
    }

    private unsubscribeScan(): void {
        if (this.scanSubscription && !this.scanSubscription.closed) {
            this.scanSubscription.unsubscribe();
            this.scanSubscription = undefined;
        }
    }
}
