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

    public content: string;

    constructor(private navService: NavService,
                private api: ApiService,
                private storage: StorageService,
                private platform: Platform) {
    }

    public async ionViewWillEnter() {
        await this.load(`Initialisation de l'application`, async () => {
            await this.platform.ready();
            await this.storage.initialize(true);
        });

        await this.load(`Chargement des dépôts`, async () => {
            const depositories = await this.api.request(ApiService.DEPOSITORIES).toPromise();
            await this.storage.insert<Depository>('depository', depositories, true);
        });

        await this.load(`Chargement des emplacements`, async () => {
            const locations = await this.api.request(ApiService.LOCATIONS).toPromise();
            await this.storage.insert<Entity>('location', locations, true);
        });

        await this.load(`Chargement des qualités`, async () => {
            const qualities = await this.api.request(ApiService.QUALITIES).toPromise();
            await this.storage.insert<Entity>('quality', qualities, true);
        });

        this.storage.getUser().subscribe(user => {
            if(user.rights.preparations) {
                this.navService.push(NavService.PREPARATION_LIST);
            } else if(user.rights.deliveries) {
                this.navService.push(NavService.DELIVERY_ROUNDS);
            } else if(user.rights.receptions) {
                this.navService.push(NavService.RECEPTION_MENU);
            } else {
                this.navService.push(NavService.COLLECT_LIST);
            }
        });
    }

    private async load(text: string, callback: () => void) {
        this.content = text;
        console.log(text);

        await callback();
    }

}
