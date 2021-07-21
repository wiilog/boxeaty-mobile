import {Component, Input, OnInit} from '@angular/core';
import {StorageService} from '@app/services/storage.service';
import {Depository} from '@app/entities/depository';
import {ApiService} from '@app/services/api.service';
import {NavService} from '@app/services/nav.service';
import {ToastService} from '@app/services/toast.service';

@Component({
  selector: 'app-reception-crate',
  templateUrl: './reception-crate.page.html',
  styleUrls: ['./reception-crate.page.scss'],
})
export class ReceptionCratePage implements OnInit {

    @Input()
    public preparing: string;

    public depositories: Array<{label: string; value: number}> = null;
    public crates: Array<{crateNumber: string; crateLocation: string; crateType: string; crateId: number}> = null;

    constructor(private storage: StorageService, private api: ApiService, private nav: NavService, private toast: ToastService) {
    }

    ionViewWillEnter() {
        this.storage.get<Depository>(StorageService.DEPOSITORY).then(depositories => {
            this.depositories = depositories.map(depository => ({
                value: depository.id,
                label: depository.name,
            }));
        });
    }

    ngOnInit() {
    }

    depositoryChanged(depository) {
        this.api.request(ApiService.CRATES, {depository}).subscribe((crates) => {
            this.crates = crates;
        });
    }

    goToCrate(crateNumber: string) {
        const crate = this.crates.find((c) => c.crateNumber === crateNumber);
        if (crate) {
            this.nav.push(NavService.RECEPTION_BOX_SCAN, {crateNumber});
        } else {
            this.toast.show('La caisse flashée n\'existe pas dans la liste actuelle.');
        }
    }
}
