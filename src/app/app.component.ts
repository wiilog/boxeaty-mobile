import {Component, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {NavService} from './services/nav.service';
import {Keyboard} from '@capacitor/keyboard';
import {StorageService} from '@app/services/storage.service';
import {Rights, User} from '@app/entities/user';

@Component({
    selector: 'bx-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {

    public readonly LOGIN_PATH = NavService.path(NavService.LOGIN);
    public readonly LOADING_PATH = NavService.path(NavService.LOADING);

    public readonly PREPARATIONS = `preparations`;
    public readonly DELIVERIES = `deliveries`;
    public readonly COLLECTS = `collects`;
    public readonly RECEPTIONS = `receptions`;

    public current: string;
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
        this.current = this.PREPARATIONS;
    }

    public navigateDeliveries() {
        this.navService.push(NavService.DELIVERY_ROUNDS);
        this.current = this.DELIVERIES;
    }

    public navigateReceptions() {
        this.navService.push(NavService.RECEPTION_MENU);
        this.current = this.RECEPTIONS;
    }

    public navigateCollects() {
        this.navService.push(NavService.COLLECT_LIST);
        this.current = this.COLLECTS;
    }

    public logout() {
        this.storage.setUser(null);
        this.navService.setRoot(NavService.LOGIN);
    }

}
