import {Component, OnInit} from '@angular/core';
import {StorageService} from "@app/services/storage.service";
import {Depository} from "@app/entities/depository";
import {ApiService} from "@app/services/api.service";

@Component({
    selector: 'app-list',
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

    public depositories: Array<{ label: string; value: number }> = undefined;
    public preparations: Array<{ client: string; crate_amount: number; token_amount: number; order_number: string }> = undefined;

    public loading: boolean;

    constructor(private storage: StorageService, private api: ApiService) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.storage.get<Depository>(StorageService.DEPOSITORY).then(depositories => {
            this.depositories = depositories.map(depository => ({
                value: depository.id,
                label: depository.name,
            }));
        });

        this.getPreparations();
    }

    getPreparations(depository = undefined) {
        this.loading = true;
        this.api.request(ApiService.PREPARATIONS, {depository}).subscribe((preparations) => {
            this.preparations = preparations;
        });
    }

}
