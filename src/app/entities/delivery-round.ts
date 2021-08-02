import {Entity} from "@app/entities/entity";

export interface DeliveryRound extends Entity {
    id: number;
    number: string;
    status: string;
    depository: string;
    expected_date: string;
    crateAmount: number;
    tokenAmount: number;
    orders: Array<any>;
    order: Array<number>;

    joined_clients: string;
}
