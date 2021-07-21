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
    readonly RECEPTION_MENU = NavService.RECEPTION_MENU;

    readonly PREPARATIONS = `preparations`;
    readonly DELIVERIES = `deliveries`;
    readonly COLLECTS = `collects`;
    readonly RECEPTIONS = `receptions`;

    public current: string;

    constructor(private platform: Platform, private storage: StorageService,
                private api: ApiService, public router: Router,
                public navService: NavService) {
        this.platform.ready().then(async () => {
            await this.storage.initialize();
        });
    }

    navigatePreparations() {
        this.navService.push(NavService.PREPARATIONS);
        this.current = this.PREPARATIONS;
    }

    navigateDeliveries() {
        this.navService.push(NavService.DELIVERY_ROUNDS);
        this.current = this.DELIVERIES;
    }

    navigateReceptions() {
        this.navService.push(NavService.HOME);
        this.current = this.RECEPTIONS;
    }

    navigateCollects() {
        this.navService.push(NavService.HOME);
        this.current = this.COLLECTS;
    }

    logout() {
        this.navService.setRoot(NavService.LOGIN);
    }

    goTo(route: string, args = {}) {
        this.navService.push(route, args);
    }
}
