import {Injectable, NgZone} from '@angular/core';
import {BarcodeScanner} from '@capacitor-community/barcode-scanner';
import {Subject, Subscription} from 'rxjs';
import {ToastService} from '@app/services/toast.service';
import {WebIntent} from '@ionic-native/web-intent/ngx';
import {Platform} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ScannerService {

    private static readonly ZEBRA_VALUE_ATTRIBUTE: string = 'com.symbol.datawedge.data_string';
    private static readonly ZEBRA_FILTER_ACTION: string = 'fr.wiilog.boxeatymobile.ACTION';
    private static readonly ZEBRA_FILTER_CATEGORY: string = 'android.intent.category.DEFAULT';

    public readonly scan$: Subject<{ mode: 'zebra' | 'photo'; barCode: string; }>;

    private zebraBroadcastReceiverAlreadyReceived: boolean;

    private ngZone: NgZone;

    private backButtonSubscription: Subscription;

    private body;

    public constructor(private toastService: ToastService,
                       private platform: Platform,
                       private webIntent: WebIntent) {
        this.scan$ = new Subject();

        this.scan$.subscribe(() => {
        }, ({mode}) => {
            if(mode === 'photo') {
                this.toastService.show('Une erreur est survenue lors du scan.');
            }
        });

        this.ngZone = new NgZone({enableLongStackTrace: false});
        this.zebraBroadcastReceiverAlreadyReceived = false;

        this.registerZebraBroadcastReceiver();
    }

    public launchScan(): void {
        BarcodeScanner
            .checkPermission({force: true})
            .then((status) => {
                if(status.granted) {
                    this.show();

                    BarcodeScanner.startScan().then(result => {
                        this.hide();

                        if(result.hasContent) {
                            const sanitized = result.content.replace(/http[s]?:\/\/box\.boxeaty\.fr\/(.*)/i, `$1`);
                            this.scan$.next({mode: 'photo', barCode: sanitized});
                        } else {
                            this.scan$.error({mode: 'photo'});
                        }
                    });
                } else {
                    this.scan$.error({mode: 'photo'});
                }
            });
    }

    public stop() {
        BarcodeScanner.stopScan();
        this.hide();
        this.unsubscribeBackButton();
    }

    public hide() {
        this.setOpacity(1);
    }

    public show() {
        this.setOpacity(0);
        this.unsubscribeBackButton();
        this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(10, () => {
            this.stop();
        });
    }

    public setOpacity(value: number): void {
        if(!this.body) {
            this.body = document.getElementsByTagName(`html`)[0];
        }

        this.body.style.transition = `opacity 500ms`;
        this.body.style.opacity = `${value}`;
    }

    private registerZebraBroadcastReceiver(): void {
        if(!this.zebraBroadcastReceiverAlreadyReceived) {
            this.zebraBroadcastReceiverAlreadyReceived = true;

            const config = {
                filterActions: [ScannerService.ZEBRA_FILTER_ACTION],
                filterCategories: [ScannerService.ZEBRA_FILTER_CATEGORY]
            };

            this.webIntent.registerBroadcastReceiver(config).subscribe(intent => {
                this.ngZone.run(() => {
                    this.scan$.next({
                        mode: 'zebra',
                        barCode: intent.extras[ScannerService.ZEBRA_VALUE_ATTRIBUTE]
                    });
                });
            });
        }
    }

    private unsubscribeBackButton(): void {
        if(this.backButtonSubscription && !this.backButtonSubscription.closed) {
            this.backButtonSubscription.unsubscribe();
            this.backButtonSubscription = undefined;
        }
    }

}
