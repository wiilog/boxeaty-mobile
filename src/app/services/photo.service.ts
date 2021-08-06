import {Injectable} from '@angular/core';
import {Camera, CameraResultType} from '@capacitor/camera';

@Injectable({
    providedIn: 'root'
})
export class PhotoService {

    private body;
    private open: boolean = false;

    constructor() {
    }

    public isOpen(): boolean {
        return this.open;
    }

    public async take(): Promise<string> {
        this.open = true;
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Uri,
            saveToGallery: false,
        });

        this.open = false;

        return image.webPath;
    }

}
