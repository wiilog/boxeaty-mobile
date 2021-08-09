import {Component, OnInit} from '@angular/core';
import {NavService} from "@app/services/nav.service";

@Component({
    selector: 'app-reception-menu',
    templateUrl: './reception-menu.page.html',
    styleUrls: ['./reception-menu.page.scss'],
})
export class ReceptionMenuPage implements OnInit {

    readonly RECEPTION_CRATE = NavService.RECEPTION_CRATE;

    constructor(public navService: NavService) {
    }

    ngOnInit() {
    }

}
