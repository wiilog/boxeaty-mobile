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
    public iconWidth: string;

    @Input()
    public disabled: boolean|string = false;

    @Input()
    public scanner: boolean;

    @Input()
    public roundCenteredButton: boolean;

    @Output()
    public click = new EventEmitter<void>();

    public scanning: boolean = false;

    public scanSubscription: Subscription;

    public constructor(private scannerService: ScannerService,
                       private toastService: ToastService,
                       private platform: Platform) {

    }

    public ngOnInit(): void {
        this.scanSubscription = this.platform.backButton.subscribeWithPriority(10, () => {
            this.scannerService.stop();
            this.scanSubscription.unsubscribe();
        });
    }

    ngOnDestroy() {
        if (this.scanSubscription) {
            this.scanSubscription.unsubscribe();
        }
    }

    public startScan(): void {
        if (this.scanner) {
            this.scanning = true;
            this.scannerService.launchScan();
        }
    }

    handleClick(event) {
        if(this.disabled) {
            event.stopPropagation();
            return;
        }

        if (this.scanner && !this.disabled) {
            this.startScan();
        }
    }

}
