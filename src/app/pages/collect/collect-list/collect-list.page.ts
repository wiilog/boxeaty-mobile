import {Component} from '@angular/core';
import {ApiService} from '@app/services/api.service';
import {ViewWillEnter} from '@ionic/angular';
import {NavService} from '@app/services/nav.service';
import {Collect} from '@app/entities/collect';

@Component({
    selector: 'bx-collect-list',
    templateUrl: './collect-list.page.html',
    styleUrls: ['./collect-list.page.scss'],
})
export class CollectListPage implements ViewWillEnter {

    public pendingCollects: Array<Collect> = [];

    constructor(private api: ApiService, private nav: NavService) {
    }

    public ionViewWillEnter(event = null) {
        this.api.request(ApiService.GET_COLLECTS, {}, !event ? `Récupération des collectes` : null)
            .subscribe((pendingCollects) => {
                this.pendingCollects = pendingCollects;

                if(event) {
                    event.target.complete();
                }
            });
    }

    public new() {
        this.nav.push(NavService.COLLECT_NEW_PICK_LOCATION);
    }

    public treat(collect: Collect) {
        this.nav.push(NavService.COLLECT_DETAILS, {collect});
    }

}
