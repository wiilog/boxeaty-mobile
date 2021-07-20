import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ScannerService} from "../../services/scanner.service";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'bx-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {

    @Input()
    public label: string;

    @Input()
    public icon: string;

    @Output()
    public action = new EventEmitter<string>();

    constructor(private scanService: ScannerService, private toastService: ToastService) {
    }

    startScan() {
        this.scanService.scan((response) => {
            this.action.emit(response);
        }, () => {
            this.toastService.show('Une erreur est survenue lors du scan de la caisse.');
        });
    }
}
