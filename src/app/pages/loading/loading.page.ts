import {Component} from '@angular/core';
import {NavService} from '@app/services/nav.service';
import {ApiService} from '@app/services/api.service';
import {Depository} from '@app/entities/depository';
import {StorageService} from '@app/services/storage.service';
import {Platform, ViewWillEnter} from '@ionic/angular';
import {AppComponent} from '@app/app.component';
import {Location} from '@app/entities/location';
import {Quality} from '@app/entities/quality';

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

        const depository = async () => {
            const depositories = await this.api.request(ApiService.DEPOSITORIES).toPromise();
            await this.storage.insert<Depository>(`depository`, depositories, true);

            console.log(`Chargement des dépôts terminé`);
        };

        const location = async () => {
            const locations = await this.api.request(ApiService.LOCATIONS).toPromise();
            await this.storage.insert<Location>(`location`, locations, true);

            console.log(`Chargement des emplacements terminé`);
        };

        const quality = async () => {
            const qualities = await this.api.request(ApiService.QUALITIES).toPromise();
            await this.storage.insert<Quality>(`quality`, qualities, true);

            console.log(`Chargement des qualités terminé`);
        };

        await this.load(`Chargement des données`, depository, location, quality);

        this.storage.getUser().subscribe(user => {
            if(user) {
                if (user.rights.preparations) {
                    this.navService.setRoot(NavService.PREPARATION_LIST);
                    this.navService.menu = AppComponent.PREPARATIONS;
                } else if (user.rights.deliveries) {
                    this.navService.setRoot(NavService.DELIVERY_ROUNDS);
                    this.navService.menu = AppComponent.DELIVERIES;
                } else if (user.rights.receptions) {
                    this.navService.setRoot(NavService.RECEPTION_MENU);
                    this.navService.menu = AppComponent.RECEPTIONS;
                } else {
                    this.navService.setRoot(NavService.COLLECT_LIST);
                    this.navService.menu = AppComponent.COLLECTS;
                }
            }
        });
    }

    private async load(text: string, ...loaders: Array<() => void>) {
        this.content = text;
        console.log(text);

        await Promise.all(loaders.map(f => f()));
    }

}
