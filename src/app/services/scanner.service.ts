import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';

@Injectable({
    providedIn: 'root'
})
export class ScannerService {

    private body;
    private scanning: boolean = false;

    constructor() {
    }

    public isScanning(): boolean {
        return this.scanning;
    }

    public scan(success = null, failure = null) {
        const {BarcodeScanner} = Plugins;

        BarcodeScanner.checkPermission({ force: true }).then((status) => {
            if (status.granted) {
                this.show();

                this.scanning = true;
                BarcodeScanner.startScan().then(result => {
                    this.hide();

                    if (result.hasContent && success != null) {
                        success(result.content);
                    } else if(!result.hasContent && failure != null) {
                        failure();
                    }

                    this.scanning = false;
                });
            } else {
                failure();
            }
        });
    }

    public stop() {
        const {BarcodeScanner} = Plugins;
        BarcodeScanner.stopScan();
        this.hide();

        this.scanning = false;
    }

    public hide() {
        this.setOpacity(1);
    }

    public show() {
        this.setOpacity(0);
    }

    setOpacity(value: number) {
        if (!this.body) {
            this.body = document.getElementsByTagName(`html`)[0];
        }

        this.body.style.transition = `opacity 500ms`;
        this.body.style.opacity = `${value}`;
    }

}
