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
    lines: Array<{ crate: string, boxes: { number: string } }>;
}

export interface Order extends Entity {
    id: number;
    crate_amount: number;
    token_amount: number;
    preparation: Preparation;
    client: Client;
    lines: Array<{ box_type: { id: number, name: string }, quantity: number }>;
}
