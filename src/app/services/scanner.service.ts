import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';

@Injectable({
    providedIn: 'root'
})
export class ScannerService {

    constructor() {
    }

    public scan(success = null, failure = null) {
        const {BarcodeScanner} = Plugins;
        // check or request permission
        BarcodeScanner.showBackground();
        BarcodeScanner.stopScan();
        BarcodeScanner.checkPermission({ force: true }).then((status) => {
            if (status.granted) {
                BarcodeScanner.hideBackground(); // make background of WebView transparent
                BarcodeScanner.startScan().then(result => {
                    if (result.hasContent && success != null) {
                        BarcodeScanner.showBackground();
                        BarcodeScanner.stopScan();
                        success(result.content);
                    } else if(!result.hasContent && failure != null) {
                        BarcodeScanner.showBackground();
                        BarcodeScanner.stopScan();
                        failure();
                    }
                });
            } else {
                failure();
            }
        });
    }
}
