import {Component, OnInit} from '@angular/core';
import {Form} from '@app/utils/form';
import {ApiService} from '@app/services/api.service';
import {NavService} from '@app/services/nav.service';
import configuration from '../../../config/credentials.json';

@Component({
    selector: 'bx-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    public form = Form.create({
        email: Form.email(true),
        password: Form.password(true),
        rememberMe: Form.checkbox(),
    });

    constructor(private api: ApiService, private navService: NavService) {
        if(configuration.autoConnect && configuration.email && configuration.password) {
            this.submit(configuration).then(() => {
                console.log(`Automatically logged in with ${configuration.email}`);
            });
        }
    }

    ngOnInit() {
    }

    async submit(configuration: {email: string; password: string} = null) {
        const data = configuration || this.form.process();

        if(data) {
            const result = await this.api.request(ApiService.LOGIN, data).toPromise();
            if(result.success) {
                this.navService.setRoot(NavService.LOADING);
            }
        }
    }
}
