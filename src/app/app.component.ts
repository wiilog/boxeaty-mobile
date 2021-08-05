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
    readonly LOADING_PATH = NavService.path(NavService.LOADING);

    readonly PREPARATIONS = `preparations`;
    readonly DELIVERIES = `deliveries`;
    readonly COLLECTS = `collects`;
    readonly RECEPTIONS = `receptions`;

    public current: string;

    constructor(public router: Router, public navService: NavService, private platform: Platform) {
        window.screen.orientation.lock('portrait');

        this.platform.ready().then(async () => {
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
        this.navService.push(NavService.RECEPTIONS);
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
