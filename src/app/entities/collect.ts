import {Entity} from '@app/entities/entity';

export interface Collect extends Entity {

    id: number;
    number: string;
    token_amount: number;
    crate_amount: number;
    depository: string;
    client: string;
    address: string;
    pick_location: string;
    main_contact: string;
    phone_number: string;
}
