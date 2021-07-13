import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Form} from "../../utils/form";
import {ApiService} from "@app/services/api.service";
import {NavService} from "@app/services/nav.service";

@Component({
    selector: 'app-login',
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
    }

    ngOnInit() {
    }

    async submit() {
        const data = this.form.process();
        if(data) {
            const result = await this.api.request(ApiService.LOGIN, data).toPromise();
            if(result.success) {
                this.navService.setRoot(NavService.HOME);
            }
        }
    }
}
