import {Injectable} from '@angular/core';
import {Camera, CameraResultType} from '@capacitor/camera';

@Injectable({
    providedIn: 'root'
})
export class PhotoService {

    private static readonly TRANSLATIONS = {
        promptLabelCancel: `Annuler`,
        promptLabelPhoto: `Depuis la galerie`,
        promptLabelPicture: `Prendre une photo`,
    };

    public async take(): Promise<string> {
        const image = await Camera.getPhoto({
            quality: 60,
            allowEditing: false,
            resultType: CameraResultType.DataUrl,
            saveToGallery: false,
            ...PhotoService.TRANSLATIONS,
        });

        return image.dataUrl;
    }

}
