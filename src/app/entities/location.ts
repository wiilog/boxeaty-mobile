import {Entity} from '@app/entities/entity';

export interface Location extends Entity {
    name: string;
    client: string;
    address: string;
    main_contact: string;
    phone_number: string;
}
