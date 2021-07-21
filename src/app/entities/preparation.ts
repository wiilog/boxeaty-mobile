import {Entity} from "@app/entities/entity";

export interface Preparation extends Entity {
    client: string
    crateAmount: number;
    tokenAmount: number;
    orderNumber: string;
}
