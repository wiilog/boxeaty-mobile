export interface Preparation {
    id: number;
    treatedCrates: Array<PreparationCrate>;
    untreatedCrates: Array<PreparationCrate>;
}

export interface PreparationCrate {
    // selected
    id: number;
    number: string;

    // cart
    type: string;
    boxes: Array<PreparationBox>;
}

export interface PreparationBox {
    type: string;
    quantity: number;
    selected: Array<string>; // box numbers
}
