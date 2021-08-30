import {Component} from '@angular/core';
import {ViewWillEnter, ViewWillLeave} from '@ionic/angular';
import {DeliveryRound} from '@app/entities/delivery-round';
import {NavService} from '@app/services/nav.service';
import {Order} from '@app/entities/order';
import {ToastService} from '@app/services/toast.service';
import {ApiService} from '@app/services/api.service';
import {Subscription} from 'rxjs';
import {ScannerService} from '@app/services/scanner.service';

@Component({
    selector: 'app-pick-everything',
    templateUrl: './pick-everything.page.html',
    styleUrls: ['./pick-everything.page.scss'],
})
export class PickEverythingPage implements ViewWillEnter, ViewWillLeave {

    public deliveryRound: DeliveryRound;

    public crates: Array<{ order: number; type: string; crate: string; taken: boolean }>;
    public finished: boolean = false;

    private scanSubscription: Subscription;

    public constructor(private nav: NavService,
                       private scannerService: ScannerService,
                       private api: ApiService,
                       private toast: ToastService) {
    }

    public ionViewWillEnter(): void {
        this.deliveryRound = this.nav.param<DeliveryRound>('deliveryRound');
        this.crates = this.deliveryRound.orders.flatMap((order: Order) => {
            for(const line of order.preparation.lines) {
                line.order = order.id;
            }

            return order.preparation.lines;
        });

        this.finished = this.crates.filter(crate => !crate.taken).length === 0;

        this.unsubscribeScan();
        this.scanSubscription = this.scannerService.scan$.subscribe(({barCode}) => {
            this.scanCrate(barCode);
        });
    }

    public ionViewWillLeave(): void {
        this.unsubscribeScan();
    }

    public async scanCrate(number: string) {
        const crate = this.crates.find((savedCrate) => savedCrate.crate === number);
        if (crate && !crate.taken) {
            const result = await this.api.request(ApiService.DELIVERY_TAKE, crate).toPromise();
            if(result.success) {
                crate.taken = true;
            }
        } else if (crate && crate.taken) {
            await this.toast.show(`Cette caisse a déjà été prise`);
        } else {
            await this.toast.show(`Cette caisse ne fait pas partie de la livraison`);
        }

        this.finished = this.crates.filter((savedCrate) => !savedCrate.taken).length === 0;
    }

    public finish() {
        this.nav.pop();
    }

    private unsubscribeScan(): void {
        if (this.scanSubscription && !this.scanSubscription.closed) {
            this.scanSubscription.unsubscribe();
            this.scanSubscription = undefined;
        }
    }

}
