import {Component, OnInit} from '@angular/core';
import {LoadingController, ViewWillEnter} from '@ionic/angular';
import {NavService} from '@app/services/nav.service';
import {ApiService} from '@app/services/api.service';
import {ToastService} from '@app/services/toast.service';
import {Preparation, PreparationBox, PreparationCrate} from '@app/pages/preparation/preparation';
import {mergeMap} from 'rxjs/operators';

@Component({
    selector: 'bx-preparation-box-picking',
    templateUrl: './preparation-box-picking.page.html',
    styleUrls: ['./preparation-box-picking.page.scss'],
})
export class PreparationBoxPickingPage implements ViewWillEnter, OnInit {

    public crate: PreparationCrate;
    public preparation: Preparation;

    public preparationBoxesAmount: number;
    public selectedPreparationBoxes: number;

    public preparedTypes: Array<{
        requestedQuantity: 0,
        preparedQuantity: 0,
        type
    }> = [];

    public availableBoxes: Map<
        string,
        Map<
            string,
            {
                type: string;
                location: string;
                number: string;
            }
        >
    >;

    public flattenAvailableBoxes: Array<{
        type: string;
        location: string;
        number: string;
        selected?: boolean;
    }> = [];

    public constructor(private nav: NavService,
                       private api: ApiService,
                       private loader: LoadingController,
                       private toastService: ToastService) {
    }

    public ngOnInit() {
        this.crate = this.nav.param<PreparationCrate>(`crate`);
        this.preparation = this.nav.param<Preparation>(`preparation`);

        this.initializePage();

        this.calculateProgress();
    }

    public ionViewWillEnter() {
        const crateContentPage = this.nav.param<any>(`crateContentPage`);

        if (crateContentPage && crateContentPage.type && crateContentPage.deletedBoxes) {
            this.unselectBoxes(crateContentPage);
        }
    }

    public scanBox(boxNumber: string) {
        const box = this.flattenAvailableBoxes.find(({number}) => (number === boxNumber));
        const requestedPreparationBox: PreparationBox = (
            box
            && this.crate.boxes.find((preparationBox: PreparationBox) => preparationBox.type === box.type)
        );
        if (!box) {
            this.toastService.show(`La Box <strong>${box}</strong> n'est pas reconnue`);
        }
        else if (box.selected) {
            this.toastService.show(`La Box <strong>${box.number}</strong> est déjà dans la caisse`);
        }
        else if (requestedPreparationBox) {
            if (requestedPreparationBox.selected
                && requestedPreparationBox.quantity === requestedPreparationBox.selected.length) {
                this.toastService.show(`Un nombre suvisant de Box a été préparé pour le type <strong>${box.type}</strong>`);
            }
            else {
                requestedPreparationBox.selected.push(box.number);
                box.selected = true;
                this.calculateProgress();
                this.toastService.show(`La Box <strong>${box.number}</strong> a bien été ajoutée`);
            }
        } else {
            this.toastService.show(`La Box <strong>${box.number}</strong> n'est pas dans la préparation`);
        }
    }

    public onPreparedTypeClicked(clickedType: string) {
        const containedBoxes = this.crate.boxes
            .filter(({type}) => clickedType === type)
            .reduce((boxes: Array<string>, requestedBoxes) => [
                ...boxes,
                ...requestedBoxes.selected
            ], []);

        this.nav.push(NavService.PREPARATION_CRATE_CONTENT, {
            containedBoxes,
            type: clickedType
        });
    }

    public endPicking() {
        if (this.preparationBoxesAmount === this.selectedPreparationBoxes) {
            this.nav.pop(NavService.PREPARATION_CRATES_TO_PREPARE, {
                boxPicking: {
                    crate: this.crate
                }
            });
        }
    }

    private initializePage(): void {
        this.api
            .request(ApiService.PATCH_PREPARATION, {
                preparation: this.preparation.id,
                preparing: true
            }, `Réservation de la préparation...`)
            .subscribe(
                ({success, message}) => {
                    if (success) {
                        if (message) {
                            this.toastService.show(message);
                        }
                        this.getAvailableBoxes();
                    }
                    else {
                        this.nav.pop(NavService.PREPARATION_LIST);
                    }
                },
                () => {
                    this.nav.pop(NavService.PREPARATION_LIST);
                }
            );
    }

    private getAvailableBoxes(): void {
        const params = {
            preparation: this.preparation.id
        };

        this.api.request(ApiService.GET_BOXES, params, `Chargement des Box disponibles`)
            .subscribe(({availableBoxes}) => {
                const requestedTypes = this.crate.boxes.map(({type}) => type);
                this.flattenAvailableBoxes = availableBoxes;
                this.availableBoxes = availableBoxes
                    .filter(({type}) => requestedTypes.indexOf(type) > -1)
                    .reduce((acc: Map<string, any>, current: {type: string; location: string; number: string; }) => {
                        let locationMap;
                        if (!acc.has(current.type)) {
                            locationMap = new Map();
                            acc.set(current.type, locationMap);
                        }
                        else {
                            locationMap = acc.get(current.type);
                        }
                        let boxes;
                        if (!locationMap.has(current.location)) {
                            boxes = [];
                            locationMap.set(current.location, boxes);
                        }
                        else {
                            boxes = locationMap.get(current.location);
                        }

                        boxes.push(current);
                        return acc;
                    }, new Map());
            });
    }

    private calculateProgress(): void {
        this.preparationBoxesAmount = this.crate.boxes.reduce((sum, {quantity}) => (sum + quantity), 0);
        this.selectedPreparationBoxes = this.crate.boxes.reduce((sum, {selected}) => (sum + (selected ? selected.length : 0)), 0);
        this.calculatePreparedTypes();
    }

    private calculatePreparedTypes(): void {
        const groupedPreparedTypes = this.crate.boxes.reduce((acc, {quantity, type, selected}) => {
            if (!acc[type]) {
                acc[type] = {
                    requestedQuantity: 0,
                    preparedQuantity: 0,
                    type
                };
            }

            acc[type].requestedQuantity += quantity;
            acc[type].preparedQuantity += selected.length;

            return acc;
        }, {});

        this.preparedTypes = Object.values(groupedPreparedTypes);
    }

    private unselectBoxes({type: typeToUnselect, deletedBoxes: unselectedBoxes}: { type: string; deletedBoxes: Array<string>; }): void {
        const deletedBoxTypes = this.crate.boxes.filter(({type}) => typeToUnselect === type);
        for (const deletedBoxType of deletedBoxTypes) {
            for (const selectedBoxIndex in [...deletedBoxType.selected]) {
                if (deletedBoxType.selected[selectedBoxIndex]) {
                    const currentNumber = deletedBoxType.selected[selectedBoxIndex];
                    const index = unselectedBoxes.indexOf(currentNumber);
                    if (index > -1) {
                        deletedBoxType.selected.splice(selectedBoxIndex, 1);
                        const availableBox = this.flattenAvailableBoxes.find(({number}) => (number === currentNumber));
                        if (availableBox) {
                            availableBox.selected = false;
                        }
                    }
                }
            }
        }

        this.calculateProgress();
    }
}
