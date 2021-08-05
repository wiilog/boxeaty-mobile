import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {Observable} from 'rxjs';
import {PhotoService} from "@app/services/photo.service";
import {ScannerService} from "@app/services/scanner.service";

@Injectable({
    providedIn: 'root'
})
export class CanLeaveGuard implements CanDeactivate<any> {

    public constructor(private photo: PhotoService, private scanner: ScannerService) {
    }

    public canDeactivate(page: any): boolean | Observable<boolean> {
        return !this.photo.isOpen() && !this.scanner.isScanning();
    }

}
