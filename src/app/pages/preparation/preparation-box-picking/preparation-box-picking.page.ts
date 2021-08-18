import {Component, OnInit} from '@angular/core';
import {LoadingController, ViewWillEnter} from '@ionic/angular';
import {NavService} from '@app/services/nav.service';
import {ApiService} from '@app/services/api.service';
import {ToastService} from '@app/services/toast.service';
import {Stream} from '@app/utils/stream';

@Component({
    selector: 'bx-preparation-box-picking',
    templateUrl: './preparation-box-picking.page.html',
    styleUrls: ['./preparation-box-picking.page.scss'],
})
export class PreparationBoxPickingPage implements ViewWillEnter, OnInit {

    public crateNumber: string;
    public preparation: string;
    public type: string;

    public crateVolume: number;
    public takenBoxes: number;
    public totalBoxes: number;
    public progress: number;

    public total: number;
    public current: number;

    public availableBoxes = {};
    public typeQuantity = {};
    public scannedBoxes = [];
    public containedBoxes = [];
    public movements = [];

    constructor(private nav: NavService, private api: ApiService,
                private loader: LoadingController, private toastService: ToastService) {
    }

    public ionViewWillEnter() {
        this.type = this.nav.param<string>(`type`);

        if (this.containedBoxes && this.type) {
            const scannedBoxesToChange = this.scannedBoxes.find((b) => b.type === this.type);

            if (this.containedBoxes.length === 0) {
                const index = this.scannedBoxes.findIndex((b) => b.type === this.type);
                this.scannedBoxes.splice(index, 1);
            } else {
                scannedBoxesToChange.quantity -= this.containedBoxes.length;
                scannedBoxesToChange.subs = this.containedBoxes;
            }
        }

        this.getAvailableBoxes(this.preparation);
    }

    public ngOnInit() {
        this.crateNumber = this.nav.param<string>(`crate`);
        this.preparation = this.nav.param<string>(`preparation`);
    }

    public scanBox(box) {
        const values = Object.values(this.availableBoxes);
        const boxes = Stream.flatten(values);
        if (boxes.includes(box)) {
            this.addBox(box);
        } else {
            this.toastService.show(`La Box <strong>${box}</strong> n'est pas présente sur les emplacements`);
        }
    }

    public crateContent(containedBoxes, type) {
        this.nav.push(NavService.CRATE_CONTENT, {
            containedBoxes,
            type,
            movements: this.movements
        });
    }

    public endPicking() {
        this.api.request(ApiService.CREATE_BOX_PICK_TRACKING_MOVEMENT, {
            movements: this.movements
        }, 'Création des mouvements de traçabilité...')
            .subscribe(() => {
                this.nav.pop(NavService.CRATE_TO_PREPARE, {number: this.crateNumber, type: this.type});
            });
    }

    private getAvailableBoxes(preparation) {
        this.api.request(ApiService.AVAILABLE_BOXES, {
            preparation,
            preparing: true
        }, `Chargement des Box disponibles en cours...`)
            .subscribe(({availableBoxes, typeQuantity}) => {
                this.availableBoxes = availableBoxes;
                this.typeQuantity = typeQuantity;
            });
    }

    private async addBox(number) {
        const alreadyNumber = this.scannedBoxes.find((b) => b.number === number);
        if (!alreadyNumber) {
            const result = await this.api.request(ApiService.BOX_INFORMATIONS, {
                box: number,
                crate: this.crateNumber
            }, `Récupération des informations de la Box...`).toPromise();

            let success = true;
            const box = result.data;
            const already = this.scannedBoxes.find((b) => b.type === box.type);
            if (already) {
                const alreadyIndex = this.scannedBoxes.indexOf(already);
                if (this.typeQuantity[box.type].quantity <= this.scannedBoxes[alreadyIndex].quantity) {
                    success = false;
                } else {
                    this.scannedBoxes[alreadyIndex].quantity += 1;
                    this.scannedBoxes[alreadyIndex].subs.push(box.number);
                }
            } else {
                box.quantity = 1;
                box.subs = [box.number];

                this.scannedBoxes.push(box);
            }
            this.movements.push({box: box.number, date: new Date()});

            this.crateVolume = box.crateVolume;
            let neededVolume = 0;
            let totalBoxNumber = 0;
            Object.keys(this.typeQuantity).forEach((key) => {
                const type = this.typeQuantity[key];
                neededVolume += (type.quantity * type.volume);
                totalBoxNumber += type.quantity;
            });

            const averageBoxVolume = neededVolume / totalBoxNumber;
            this.total = Math.ceil(this.crateVolume / averageBoxVolume);
            this.current = this.scannedBoxes.length;
            this.progress = this.current / this.total;

            if (success) {
                await this.toastService.show(`La Box <strong>${number}</strong> a bien été ajoutée`);
            } else {
                await this.toastService.show(`La Box <strong>${number}</strong> n'a pas été ajoutée`);
            }
        } else {
            await this.toastService.show(`La Box <strong>${number}</strong> a déjà été ajoutée`);
        }
    }
}
