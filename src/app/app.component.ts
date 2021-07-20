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

    constructor(private platform: Platform, private storage: StorageService,
                private api: ApiService, public router: Router,
                public navService: NavService) {
        this.platform.ready().then(async () => {
            await this.storage.initialize();
        });
    }

    logout() {
        this.navService.setRoot(NavService.LOGIN);
    }
}
