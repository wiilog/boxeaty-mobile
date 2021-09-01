import {Entity} from "@app/entities/entity";
import {Order} from "@app/entities/order";

export interface DeliveryRound extends Entity {
    id: number;
    number: string;
    status: string;
    depository: string;
    expected_date: string;
    crate_amount: number;
    token_amount: number;
    orders: Array<Order>;
    order: Array<number>;
    joined_clients: string;
}
