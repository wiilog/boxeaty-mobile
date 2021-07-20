import {Component, OnInit} from '@angular/core';
import {NavService} from "@app/services/nav.service";
import {ApiService} from "@app/services/api.service";
import {Depository} from "@app/entities/depository";
import {StorageService} from "@app/services/storage.service";
import {ViewWillEnter} from '@ionic/angular';

@Component({
    selector: 'bx-loading',
    templateUrl: './loading.page.html',
    styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit, ViewWillEnter {

    constructor(private navService: NavService, private api: ApiService, private storage: StorageService) {
    }


    ngOnInit() {

    }

    async ionViewWillEnter() {
        const depositories = await this.api.request(ApiService.DEPOSITORIES).toPromise();
        await this.storage.insert<Depository>(StorageService.DEPOSITORY, depositories, true);

        this.navService.setRoot(NavService.HOME);
    }

}
