import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NavService} from './services/nav.service';
import {Platform} from '@ionic/angular';

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

    constructor(public router: Router, public navService: NavService, private platform: Platform) {
        this.platform.ready().then(() => {
            this.navService.setRoot(NavService.LOADING);
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
        this.navService.push(NavService.RECEPTION_MENU);
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
