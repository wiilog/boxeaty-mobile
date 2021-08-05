import {Component, OnInit} from '@angular/core';
import {NavService} from '@app/services/nav.service';
import {ApiService} from '@app/services/api.service';
import {ToastService} from '@app/services/toast.service';

@Component({
    selector: 'app-reception-box-scan',
    templateUrl: './reception-box-scan.page.html',
    styleUrls: ['./reception-box-scan.page.scss'],
})
export class ReceptionBoxScanPage implements OnInit {

    public crate: string;
    public boxes: Array<{ boxNumber: string; boxType: string; boxId: number }>;

    constructor(private navService: NavService, private api: ApiService, private toast: ToastService) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.crate = this.navService.param<string>(`crateNumber`);
        this.boxes = [];
    }

    deleteBox(box: { boxNumber: string; boxType: string; boxId: number }) {
        this.boxes = this.boxes.filter((b) => b.boxNumber !== box.boxNumber);
    }

    addBox(box: string) {
        this.api.request(ApiService.BOX, {box}).subscribe((chosen) => {
            if (chosen) {
                const already = this.boxes.find((b) => b.boxId === chosen.boxId);
                if (!already) {
                    this.boxes.push(chosen);
                }
            } else {
                this.toast.show('Aucune box disponible avec ce numéro.');
            }
        });
    }

    next() {
        if (this.boxes.length > 0) {
            const params = {
                boxes: this.boxes.reduce((carry, b) => {
                    carry.push(b.boxId);
                    return carry;
                }, []).join(','),
                crate: this.crate
            };
            this.navService.push(NavService.RECEPTION_BOX_EDIT, params);
        } else {
            this.toast.show('Veuillez ajouter au moins une box.');
        }
    }

}
