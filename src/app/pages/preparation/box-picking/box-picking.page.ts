import {Component} from '@angular/core';
import {LoadingController, ViewWillEnter} from '@ionic/angular';
import {NavService} from '@app/services/nav.service';
import {ApiService} from '@app/services/api.service';
import {ToastService} from '@app/services/toast.service';
import {Stream} from '@app/utils/stream';

@Component({
    selector: 'bx-box-picking',
    templateUrl: './box-picking.page.html',
    styleUrls: ['./box-picking.page.scss'],
})
export class BoxPickingPage implements ViewWillEnter {

    public crateNumber: string;
    public preparation: string;

    public crateVolume: number;
    public takenBoxes: number;
    public totalBoxes: number;
    public progress: number;

    public total: number;
    public current: number;

    public availableBoxes = {};
    public typeQuantity = {};
    public scannedBoxes = [];

    constructor(private nav: NavService, private api: ApiService,
                private loader: LoadingController, private toastService: ToastService) {
    }

    public ionViewWillEnter() {
        this.crateNumber = this.nav.param<string>(`crate`);
        this.preparation = this.nav.param<string>(`preparation`);

        this.getAvailableBoxes(this.preparation);
    }

    public scanBox(box) {
        const values = Object.values(this.availableBoxes);
        const boxes = Stream.flatten(values);
        if (boxes.includes(box)) {
            this.addBox(box);
        } else {
            this.toastService.show('La Box <strong>' + box + '</strong> n\'est pas présente sur les emplacements');
        }
    }

    public crateContent(containedBoxes, type) {
        this.nav.push(NavService.CRATE_CONTENT, {containedBoxes, type});
    }

    private getAvailableBoxes(preparation) {
        this.loader.create({
            message: 'Chargement des Box disponibles en cours...',
        }).then((loader) => {
            loader.present().then(() => {
                this.api.request(ApiService.AVAILABLE_BOXES, {preparation})
                    .subscribe(({availableBoxes, typeQuantity}) => {
                        loader.dismiss();
                        this.availableBoxes = availableBoxes;
                        this.typeQuantity = typeQuantity;
                    }, () => {
                        loader.dismiss();
                    });
            });
        });
    }

    private addBox(number) {
        const alreadyNumber = this.scannedBoxes.find((b) => b.number === number);
        if (!alreadyNumber) {
            this.loader.create({
                message: 'Récupération des informations de la Box...',
            }).then((loader) => {
                loader.present().then(() => {
                    this.api.request(ApiService.BOX_INFORMATIONS, {
                        box: number,
                        crate: this.crateNumber
                    }).subscribe((box) => {
                        loader.dismiss();
                        let success = true;
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

                        this.crateVolume = box.crateVolume;
                        let neededVolume = 0;
                        let totalBoxNumber = 0;
                        let averageBoxVolume = 0;
                        Object.keys(this.typeQuantity).forEach((key) => {
                            const type = this.typeQuantity[key];
                            neededVolume += (type.quantity * type.volume);
                            totalBoxNumber += type.quantity;
                        });

                        averageBoxVolume = neededVolume / totalBoxNumber;
                        this.total = Math.ceil(this.crateVolume / averageBoxVolume);
                        this.current = this.scannedBoxes.length;
                        this.progress = this.current / this.total;

                        if (success) {
                            this.toastService.show('La Box <strong>' + number + '</strong> a bien été ajoutée');
                        } else {
                            this.toastService.show('La Box <strong>' + number + '</strong> n\'a pas été ajoutée');
                        }

                        console.log(this.scannedBoxes);
                    }, () => {
                        loader.dismiss();
                        this.toastService.show('Une erreur est survenue');
                    });
                });
            });
        } else {
            this.toastService.show('La Box <strong>' + number + '</strong> a déjà été ajoutée');
        }
    }
}
