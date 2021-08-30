import {Component} from '@angular/core';
import {ViewWillEnter} from '@ionic/angular';
import {NavService} from '@app/services/nav.service';
import {Order} from '@app/entities/order';
import {ToastService} from '@app/services/toast.service';
import {ApiService} from '@app/services/api.service';
import {Subscription} from 'rxjs';
import {ScannerService} from '@app/services/scanner.service';

@Component({
    selector: 'app-deposit-boxes',
    templateUrl: './deposit-boxes.page.html',
    styleUrls: ['./deposit-boxes.page.scss'],
})
export class DepositBoxesPage implements ViewWillEnter {

    public order: Order;
    public toDeposit: Array<{ order: number, type: string, crate: string, taken: boolean, deposited: boolean }> = [];
    public deposited: Array<{ order: number, type: string, crate: string, taken: boolean, deposited: boolean }> = [];

    private scanSubscription: Subscription;

    public constructor(private nav: NavService,
                       private scannerService: ScannerService,
                       private api: ApiService,
                       private toast: ToastService) {
    }

    public ionViewWillEnter(): void {
        this.order = this.nav.param<Order>(`order`);

        for(const line of this.order.preparation.lines as Array<any>) {
            line.order = this.order.id;

            if(line.deposited) {
                this.deposited.push(line);
            } else {
                this.toDeposit.push(line);
            }
        }

        this.unsubscribeScan();
        this.scanSubscription = this.scannerService.scan$.subscribe(({barCode}) => {
            this.scanCrate(barCode);
        });
    }

    public ionViewWillLeave(): void {
        this.unsubscribeScan();
    }

    public async scanCrate(number: string) {
        const index = this.toDeposit.findIndex(crate => crate.crate === number);
        if(index !== -1) {
            const line = this.toDeposit[index];

            const result = await this.api.request(ApiService.DELIVERY_DEPOSIT, line).toPromise();
            if(result.success) {
                line.deposited = true;
                this.deposited.push(...this.toDeposit.splice(index, 1));
            }
        } else if(this.deposited.findIndex(crate => crate.crate === number) !== -1) {
            await this.toast.show(`Cette caisse a déjà été déposée`);
        } else {
            await this.toast.show(`Cette caisse ne fait pas partie de la livraison`);
        }
    }

    public finish() {
        this.nav.push(NavService.DELIVERY_SIGN, {
            order: this.order,
        });
    }

    private unsubscribeScan(): void {
        if (this.scanSubscription && !this.scanSubscription.closed) {
            this.scanSubscription.unsubscribe();
            this.scanSubscription = undefined;
        }
    }

}
