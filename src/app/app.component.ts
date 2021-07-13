import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NavService} from "./services/nav.service";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    readonly LOGIN_PATH = NavService.path(NavService.LOGIN);

    constructor(public router: Router) {
    }
}
