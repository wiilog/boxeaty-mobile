export interface User {
    username: string;
    token: string;
    rights: Rights;
}

export interface Rights {
    preparations: boolean;
    deliveries: boolean;
    receptions: boolean;
    all_collects: boolean;
}
