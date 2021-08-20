import {Component} from '@angular/core';
import {ViewWillEnter} from '@ionic/angular';
import {NavService} from '@app/services/nav.service';
import {ToastService} from '@app/services/toast.service';

@Component({
    selector: 'bx-preparation-crate-content',
    templateUrl: './preparation-crate-content.page.html',
    styleUrls: ['./preparation-crate-content.page.scss'],
})
export class PreparationCrateContentPage implements ViewWillEnter {

    public type: string;

    public containedBoxes: Array<string> = [];
    public deletedBoxes: Array<string> = [];

    public constructor(private nav: NavService,
                       private toastService: ToastService) {
    }

    public ionViewWillEnter() {
        this.type = this.nav.param<string>('type');
        this.containedBoxes = this.nav.param<Array<string>>('containedBoxes');
        this.deletedBoxes = [];
    }

    public back() {
        this.nav.pop(NavService.PREPARATION_BOX_PICKING, {
            crateContentPage: {
                deletedBoxes: this.deletedBoxes,
                type: this.type
            }
        });
    }

    public delete(box: string) {
        const index = this.containedBoxes.indexOf(box);

        if (index > -1) {
            this.containedBoxes.splice(index, 1);
            this.deletedBoxes.push(box);
            this.toastService.show(`La Box <strong>${box}</strong> a bien été supprimée`);
        }
    }

}
