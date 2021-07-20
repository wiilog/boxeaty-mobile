import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NavService} from './services/nav.service';
import {Platform} from '@ionic/angular';
import {StorageService} from '@app/services/storage.service';
import {ApiService} from '@app/services/api.service';

@Component({
    selector: 'bx-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    readonly LOGIN_PATH = NavService.path(NavService.LOGIN);
    readonly PREPARATION_PATH = NavService.path(NavService.PREPARATIONS);
    readonly DELIVERY_PATH = NavService.path(NavService.DELIVERY_ROUNDS);
    readonly COLLECT_PATH = NavService.path(NavService.COLLECTS);
    readonly RECEPTION_PATH = NavService.path(NavService.RECEPTIONS);

    constructor(private platform: Platform, private storage: StorageService,
                private api: ApiService, public router: Router,
                public navService: NavService) {
        this.platform.ready().then(async () => {
            await this.storage.initialize();
        });
    }

    navigatePreparations() {
        this.navService.push(NavService.HOME);
    }

    navigateDeliveries() {
        this.navService.push(NavService.DELIVERY_ROUNDS);
    }

    logout() {
        this.navService.setRoot(NavService.LOGIN);
    }
}
