import {Component} from '@angular/core';
import {ViewWillEnter} from '@ionic/angular';
import {NavService} from '@app/services/nav.service';
import {ToastService} from '@app/services/toast.service';

@Component({
    selector: 'bx-crate-content',
    templateUrl: './crate-content.page.html',
    styleUrls: ['./crate-content.page.scss'],
})
export class CrateContentPage implements ViewWillEnter {

    public type: string;

    public containedBoxes = [];
    public movements: Array<{box: string; date: string}> = [];

    constructor(private nav: NavService, private toastService: ToastService) {
    }

    public ionViewWillEnter() {
        this.type = this.nav.param<string>('type');
        this.containedBoxes = this.nav.param<Array<string>>('containedBoxes');
        this.movements = this.nav.param<Array<{box: string; date: string}>>('movements');
    }

    public back() {
        this.nav.pop(NavService.BOX_PICKING, {type: this.type});
    }

    public delete(box) {
        const index = this.containedBoxes.indexOf(box);

        if(index !== -1) {
            const movementToDelete = this.movements.findIndex(m => m.box === box);

            this.movements.splice(movementToDelete, 1);
            this.containedBoxes.splice(index, 1);
            this.toastService.show(`La Box <strong>${box}</strong> a bien été supprimée`);
        }
    }

}
