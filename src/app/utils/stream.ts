export class Stream {
    public static flatten(items) {
        const flat = [];

        items.forEach(item => {
            if (Array.isArray(item)) {
                flat.push(...this.flatten(item));
            } else if(typeof item === `object`) {
                flat.push(...this.flatten(Object.values(item)));
            } else {
                flat.push(item);
            }
        });

        return flat;
    }
}
