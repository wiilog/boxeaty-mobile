import {Component, OnInit} from '@angular/core';
import {ApiService} from "@app/services/api.service";
import {ViewWillEnter} from "@ionic/angular";
import {NavService} from "@app/services/nav.service";
import {Collect} from "@app/entities/collect";

@Component({
    selector: 'bx-collect-list',
    templateUrl: './collect-list.page.html',
    styleUrls: ['./collect-list.page.scss'],
})
export class CollectListPage implements ViewWillEnter, OnInit {

    public pendingCollects: Array<Collect> = [];

    constructor(private api: ApiService, private nav: NavService) {
    }

    public ngOnInit() {

    }

    public ionViewWillEnter() {
        this.api.request(ApiService.PENDING_COLLECTS, {},
            `Récupération des collectes en cours...`).subscribe((pendingCollects) => {
            this.pendingCollects = pendingCollects;
        });
    }

    public new() {

    }

    public treat(id) {
        const collect = this.pendingCollects.find((c) => c.id === id);
        this.nav.push(NavService.COLLECT_DETAILS, {collect});
    }

}
