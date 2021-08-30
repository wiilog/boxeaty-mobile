import {Component} from '@angular/core';
import {ViewWillEnter, ViewWillLeave} from '@ionic/angular';
import {ApiService} from '@app/services/api.service';
import {ToastService} from '@app/services/toast.service';
import {NavService} from '@app/services/nav.service';
import {Form} from '@app/utils/form';
import {Location} from '@app/entities/location';
import {ScannerService} from '@app/services/scanner.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-collect-new-details',
    templateUrl: './collect-new-details.page.html',
    styleUrls: ['./collect-new-details.page.scss'],
})
export class CollectNewDetailsPage implements ViewWillEnter, ViewWillLeave {

    public location: Location;
    public crates: Array<{ number: string, type: string }> = [];

    public form = Form.create({
        collectedTokens: Form.number(0, null, true),
    });

    private order?: number;

    private scanSubscription: Subscription;

    public constructor(private api: ApiService,
                       private scannerService: ScannerService,
                       private toast: ToastService,
                       private navService: NavService) {
    }

    public ionViewWillEnter(): void {
        this.order = this.navService.param<number>('order');

        const locationId = this.navService.param<number>('location');
        this.api
            .request(ApiService.LOCATION, {location: locationId}, `Chargement des informations du point de collecte...`)
            .subscribe((location) => {
                this.location = location;
            });

        this.unsubscribeScan();
        this.scanSubscription = this.scannerService.scan$.subscribe(({barCode}) => {
            this.scanCrate(barCode);
        });
    }

    public ionViewWillLeave(): void {
        this.unsubscribeScan();
    }

    public scanCrate(number: string) {
        const index = this.crates.findIndex((c) => c.number === number);
        if (index === -1) {
            this.api.request(
                ApiService.BOX_INFORMATIONS,
                {box: number, isCrate: 1},
                `Récupération des informations de la caisse`
            ).subscribe((result) => {
                if (result.success) {
                    const crate = result.data;
                    this.crates.push({number: crate.number, type: crate.type});
                } else {
                    this.toast.show(`La caisse <strong>${number}</strong> n'existe pas`);
                }
            });
        } else {
            this.toast.show(`La caisse <strong>${number}</strong> a déjà été scannée`);
        }
    }

    public delete(number) {
        const index = this.crates.findIndex((c) => c.number = number);
        this.crates.splice(index, 1);
        this.toast.show(`La caisse <strong>${number}</strong> a bien été supprimée`);
    }

    public next() {
        const data = this.form.process() as any;
        if (data) {
            this.navService.push(NavService.COLLECT_NEW_VALIDATE, {
                location: this.location,
                crates: this.crates,
                token_amount: data.collectedTokens
            });
        }
    }

    private unsubscribeScan(): void {
        if (this.scanSubscription && !this.scanSubscription.closed) {
            this.scanSubscription.unsubscribe();
            this.scanSubscription = undefined;
        }
    }

}
