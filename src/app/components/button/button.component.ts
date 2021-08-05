import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ScannerService} from '@app/services/scanner.service';
import {ToastService} from '@app/services/toast.service';
import {Platform} from '@ionic/angular';
import {Subscription} from 'rxjs';

@Component({
    selector: 'bx-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit, OnDestroy {

    @Input()
    public type: string = `primary`;

    @Input()
    public label: string;

    @Input()
    public icon: string;

    @Input()
    public disabled: boolean = false;

    @Input()
    public scanner: boolean;

    @Output()
    public click = new EventEmitter<void>();

    @Output()
    public scan = new EventEmitter<string>();

    public scanning: boolean = false;

    public scanSubscription: Subscription;

    constructor(private scanService: ScannerService, private toastService: ToastService, private platform: Platform) {

    }

    ngOnInit() {
        this.scanSubscription = this.platform.backButton.subscribeWithPriority(10, () => {
            this.scanService.stop();
            this.scanSubscription.unsubscribe();
        });
    }

    ngOnDestroy() {
        if (this.scanSubscription) {
            this.scanSubscription.unsubscribe();
        }
    }

    startScan() {
        if (this.scanner) {
            this.scanning = true;
            this.scanService.scan((response) => {
                this.scanning = false;
                this.scan.emit(response);
            }, () => {
                this.scanning = false;
                this.toastService.show('Une erreur est survenue lors du scan de la caisse.');
            });
        }
    }

    handleClick(event) {
        if(this.disabled) {
            console.error("fuck");
            event.stopPropagation();
            return;
        }

        if (this.scanner && !this.disabled) {
            this.startScan();
        }
    }

}
