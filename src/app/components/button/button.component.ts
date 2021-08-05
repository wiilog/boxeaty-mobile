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
    public disabled: boolean;

    @Input()
    public scanner: boolean;

    @Output()
    public click = new EventEmitter<void>();

    @Output()
    public scan = new EventEmitter<string>();

    public scanning: boolean;

    public scanSubscription: Subscription;

    constructor(private scanService: ScannerService, private toastService: ToastService, private platform: Platform) {

    }

    ngOnInit() {
        this.scanSubscription = this.platform.backButton.subscribe(() => {
            this.scanService.stop();
        });
    }

    ngOnDestroy() {
        if (this.scanSubscription) {
            this.scanSubscription.unsubscribe();
        }
    }

    startScan() {
        if (this.scanner) {
            this.scanning = false;
            this.scanService.scan((response) => {
                this.scan.emit(response);
            }, () => {
                this.toastService.show('Une erreur est survenue lors du scan de la caisse.');
            });
            this.scanning = true;
        }
    }

    handleClick() {
        if (this.scanner && !this.disabled) {
            this.startScan();
        }
    }

}
