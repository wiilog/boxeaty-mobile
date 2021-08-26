import {Component, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {NavService} from './services/nav.service';
import {Keyboard} from '@capacitor/keyboard';
import {StorageService} from '@app/services/storage.service';
import {User} from '@app/entities/user';

@Component({
    selector: 'bx-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {

    public static readonly PREPARATIONS = `preparations`;
    public static readonly DELIVERIES = `deliveries`;
    public static readonly COLLECTS = `collects`;
    public static readonly RECEPTIONS = `receptions`;

    public readonly PREPARATIONS = AppComponent.PREPARATIONS;
    public readonly DELIVERIES = AppComponent.DELIVERIES;
    public readonly COLLECTS = AppComponent.COLLECTS;
    public readonly RECEPTIONS = AppComponent.RECEPTIONS;

    public readonly LOGIN_PATH = NavService.path(NavService.LOGIN);
    public readonly LOADING_PATH = NavService.path(NavService.LOADING);

    public user: User;
    public showFooter: boolean = true;

    constructor(public router: Router, public navService: NavService,
                private storage: StorageService, private detector: ChangeDetectorRef) {
        window.screen.orientation.lock(`portrait`);

        Keyboard.hide();

        Keyboard.addListener(`keyboardWillHide`, () => {
            this.showFooter = true;
            this.detector.detectChanges();
        });

        Keyboard.addListener(`keyboardWillShow`, () => {
            this.showFooter = false;
            this.detector.detectChanges();
        });

        this.storage.getUser().subscribe(user => this.user = user);
    }

    public navigatePreparations() {
        this.navService.push(NavService.PREPARATION_LIST);
        this.navService.menu = AppComponent.PREPARATIONS;
    }

    public navigateDeliveries() {
        this.navService.push(NavService.DELIVERY_ROUNDS);
        this.navService.menu = AppComponent.DELIVERIES;
    }

    public navigateReceptions() {
        this.navService.push(NavService.RECEPTION_MENU);
        this.navService.menu = AppComponent.RECEPTIONS;
    }

    public navigateCollects() {
        this.navService.push(NavService.COLLECT_LIST);
        this.navService.menu = AppComponent.COLLECTS;
    }

    public logout() {
        this.storage.setUser(null);
        this.navService.setRoot(NavService.LOGIN);
    }

}
