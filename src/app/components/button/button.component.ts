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
export class ButtonComponent implements OnInit, OnDestroy{

    @Input()
    public light: boolean;

    @Input()
    public label: string;

    @Input()
    public icon: string;

    @Input()
    public addCircle: boolean;

    @Input()
    public scanner: boolean;

    @Output()
    public action = new EventEmitter<string>();

    public scanning: boolean;

    public scan: Subscription;

    constructor(private scanService: ScannerService, private toastService: ToastService, private platform: Platform) {

    }

    ngOnInit() {
        this.scan = this.platform.backButton.subscribe(() => {
            this.scanService.stop();
        });
    }


    ngOnDestroy() {
        if (this.scan) {
            this.scan.unsubscribe();
        }
    }

    startScan() {
        if (this.scanner) {
            this.scanning = false;
            this.scanService.scan((response) => {
                this.action.emit(response);
            }, () => {
                this.toastService.show('Une erreur est survenue lors du scan de la caisse.');
            });
            this.scanning = true;
        }
    }

}
