import {Entity} from "@app/entities/entity";

export interface Client extends Entity {
    id: number;
    name: string;
    address: string;
    contact: string;
    phone: string;
    latitude: number;
    longitude: number;
}

export interface Preparation extends Entity {
    id: number;
    depository: string;
    lines: Array<PreparationLine>;
}

export interface PreparationLine {
    crate: string;
    taken: boolean;
    deposited: boolean;

    order: number;
}

export interface Order extends Entity {
    id: number;
    delivered: boolean;
    crate_amount: number;
    token_amount: number;
    preparation: Preparation;
    client: Client;
    comment: string;

    order: number;
    taken: boolean;
    deposited: boolean;
}
