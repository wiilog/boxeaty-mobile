import {Component, Output, EventEmitter} from '@angular/core';
import {PhotoService} from '@app/services/photo.service';

@Component({
    selector: 'bx-photo',
    templateUrl: './photo.component.html',
    styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent {

    @Output()
    public done = new EventEmitter<string>();

    constructor(private photo: PhotoService) {
    }

    public async open() {
        this.done.emit(await this.photo.take());
    }

}
