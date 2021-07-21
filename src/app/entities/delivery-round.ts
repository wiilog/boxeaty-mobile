import {Entity} from "@app/entities/entity";

export interface DeliveryRound extends Entity {
    id: number;
    number: string;
    status: string;
    depository: string;
    expected_date: string;
    crate_amount: number;
    token_amount: number;
    orders: Array<any>;
    order: Array<number>;
}
