import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';

@Injectable({
    providedIn: 'root'
})
export class ScannerService {

    private body;

    constructor() {
    }

    public scan(success = null, failure = null) {
        const {BarcodeScanner} = Plugins;

        this.show();
        BarcodeScanner.startScan().then(result => {
            this.hide();

            if (result.hasContent && success != null) {
                success(result.content);
            } else if(!result.hasContent && failure != null) {
                failure();
            }
        });
    }

    public stop() {
        const {BarcodeScanner} = Plugins;
        BarcodeScanner.stopScan();
        this.hide();
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
