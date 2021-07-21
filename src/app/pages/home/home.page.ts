import {Component, OnInit} from '@angular/core';
import {StorageService} from '@app/services/storage.service';
import {Depository} from '@app/entities/depository';

@Component({
    selector: 'bx-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    public depositories: Array<{label: string; value: number}> = null;

    constructor(private storage: StorageService) {
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
    }

}
