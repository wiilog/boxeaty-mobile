import {Injectable} from '@angular/core';
import {Camera, CameraResultType} from '@capacitor/camera';

@Injectable({
    providedIn: 'root'
})
export class PhotoService {

    public async take(): Promise<string> {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.DataUrl,
            saveToGallery: false,
        });

        return image.dataUrl;
    }

}
