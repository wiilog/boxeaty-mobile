import { Component, OnInit } from '@angular/core';
import {StorageService} from '@app/services/storage.service';
import {Depository} from '@app/entities/depository';
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-reception-crate',
  templateUrl: './reception-crate.page.html',
  styleUrls: ['./reception-crate.page.scss'],
})
export class ReceptionCratePage implements OnInit {

    public depositories: Array<{label: string; value: number}> = null;
    public crates: Array<{crateNumber: string; crateLocation: string; crateType: string; crateId: number}> = null;

    constructor(private storage: StorageService, private api: ApiService) {
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

    goToCrate(crate: number) {
        console.log(crate);
        console.log('GOTOCRATE');
    }
}
