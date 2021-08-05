import {Component} from '@angular/core';
import {ViewWillEnter} from '@ionic/angular';
import {NavService} from '@app/services/nav.service';
import {ToastService} from "@app/services/toast.service";

@Component({
    selector: 'bx-crate-content',
    templateUrl: './crate-content.page.html',
    styleUrls: ['./crate-content.page.scss'],
})
export class CrateContentPage implements ViewWillEnter {

    public type: string;

    public containedBoxes = [];

    constructor(private nav: NavService, private toastService: ToastService) {
    }

    public ionViewWillEnter() {
        this.type = this.nav.param<string>('type');
        this.containedBoxes = this.nav.param<Array<string>>('containedBoxes');
        console.log(this.containedBoxes);
    }

    public back() {
        this.nav.push(NavService.BOX_PICKING, {
            containedBoxes: this.containedBoxes,
            type: this.type
        });
    }

    public delete(box) {
        const index = this.containedBoxes.indexOf(box);
        if(index !== -1) {
            this.containedBoxes.splice(index, 1);
            this.toastService.show('La Box' + box + ' a bien été supprimée');
        }
        console.log(this.containedBoxes);
    }

}
