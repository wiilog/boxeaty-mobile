import {Component} from '@angular/core';
import {NavService} from '@app/services/nav.service';
import {ApiService} from '@app/services/api.service';
import {Depository} from '@app/entities/depository';
import {StorageService} from '@app/services/storage.service';
import {Platform, ViewWillEnter} from '@ionic/angular';
import {Entity} from '@app/entities/entity';

@Component({
    selector: 'bx-loading',
    templateUrl: './loading.page.html',
    styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements ViewWillEnter {

    constructor(private navService: NavService,
                private api: ApiService,
                private storage: StorageService,
                private platform: Platform) {
    }

    async ionViewWillEnter() {
        await this.platform.ready();
        await this.storage.initialize();

        const depositories = await this.api.request(ApiService.DEPOSITORIES).toPromise();
        await this.storage.insert<Depository>('depository', depositories, true);

        const locations = await this.api.request(ApiService.LOCATIONS).toPromise();
        await this.storage.insert<Entity>('location', locations, true);

        const qualities = await this.api.request(ApiService.QUALITIES).toPromise();
        await this.storage.insert<Entity>('quality', qualities, true);

        this.navService.setRoot(NavService.HOME);
    }
}
