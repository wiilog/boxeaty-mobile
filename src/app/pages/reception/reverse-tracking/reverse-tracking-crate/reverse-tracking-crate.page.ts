import {Component, Input, OnInit} from '@angular/core';
import {StorageService} from '@app/services/storage.service';
import {Depository} from '@app/entities/depository';
import {ApiService} from '@app/services/api.service';
import {NavService} from '@app/services/nav.service';
import {ToastService} from '@app/services/toast.service';

@Component({
  selector: 'app-reception-crate',
  templateUrl: './reverse-tracking-crate.page.html',
  styleUrls: ['./reverse-tracking-crate.page.scss'],
})
export class ReverseTrackingCratePage implements OnInit {

    @Input()
    public preparing: string;

    public depositories: Array<{label: string; value: number}> = null;
    public crates: Array<{crateNumber: string; crateLocation: string; crateType: string; crateId: number}> = null;

    constructor(private storage: StorageService, private api: ApiService, private nav: NavService, private toast: ToastService) {
    }

    public ionViewWillEnter() {
        this.storage.get<Depository>('depository').then(depositories => {
            this.depositories = depositories.map(depository => ({
                value: depository.id,
                label: depository.name,
            }));
        });
    }

    public ngOnInit() {
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
}
