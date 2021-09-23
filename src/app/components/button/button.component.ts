import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ScannerService} from '@app/services/scanner.service';

@Component({
    selector: 'bx-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {

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

    public constructor(private scannerService: ScannerService) {}

    public scan(): void {
        if (this.scanner) {
            this.scanning = true;
            this.scannerService.launchScan();
        }
    }

    public handleClick(event): void {
        if(this.disabled) {
            event.stopPropagation();
            return;
        }

        if (this.scanner && !this.disabled) {
            this.scan();
        }
    }

}
