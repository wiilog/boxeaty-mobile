import {Component, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {NavService} from './services/nav.service';
import {Platform} from '@ionic/angular';
import {Keyboard} from '@capacitor/keyboard';

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
    public showFooter: boolean = true;

    constructor(public router: Router, public navService: NavService, private detector: ChangeDetectorRef) {
        window.screen.orientation.lock('portrait');

        Keyboard.hide();

        Keyboard.addListener(`keyboardWillHide`, () => {
            this.showFooter = true;
            this.detector.detectChanges();
        });

        Keyboard.addListener(`keyboardWillShow`, () => {
            this.showFooter = false;
            this.detector.detectChanges();
        });
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
        this.navService.setRoot(NavService.LOGIN);
    }

}
