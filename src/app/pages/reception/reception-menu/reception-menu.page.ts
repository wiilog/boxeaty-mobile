import {Component, OnInit} from '@angular/core';
import {NavService} from "@app/services/nav.service";

@Component({
    selector: 'app-reception-menu',
    templateUrl: './reception-menu.page.html',
    styleUrls: ['./reception-menu.page.scss'],
})
export class ReceptionMenuPage implements OnInit {

    readonly RECEPTION_CRATE = NavService.REVERSE_TRACKING_CRATE;
    readonly MOVING_BOX_SCAN = NavService.MOVING_BOX_SCAN;

    constructor(public navService: NavService) {
    }

    ngOnInit() {
    }

}
