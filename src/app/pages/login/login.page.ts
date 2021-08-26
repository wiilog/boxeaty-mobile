import {Component} from '@angular/core';
import {Form} from '@app/utils/form';
import {ApiService} from '@app/services/api.service';
import {NavService} from '@app/services/nav.service';
import configuration from '@config/credentials.json';
import {StorageService} from '@app/services/storage.service';

@Component({
    selector: 'bx-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage {

    public form = Form.create({
        email: Form.email(true),
        password: Form.password(true),
    });

    public constructor(private api: ApiService,
                       private storage: StorageService,
                       private navService: NavService) {
        if (configuration.autoConnect && configuration.email && configuration.password) {
            this.submit(configuration).then(() => {
                console.log(`Automatically logged in with ${configuration.email}`);
            });
        }
    }

    public async submit(config: { email: string; password: string } = null) {
        const data = config || this.form.process();

        if (data) {
            const result = await this.api.request(ApiService.LOGIN, data).toPromise();
            if(result.success) {
                await this.storage.setUser(result.user).toPromise();
                await this.navService.setRoot(NavService.LOADING);
            }
        }
    }
}
