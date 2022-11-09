export type TranslationProps = {
    key: string;
    value: string;
    description: string;
};

export default class Translation {
    readonly key: string;

    readonly value: string;

    readonly description: string;

    constructor({ key, value, description }: TranslationProps) {
        this.key = camelCase(key);
        this.value = value;
        this.description = description;
    }

    get toJson(): Map<string, any> {
        const entries = new Map();
        entries.set(this.key, this.value);
        entries.set(`@${this.key}`, {description: this.description});
        
        return entries;
    }
}


const camelCase = (value: string): string => {
    return value
        .replace(/\s(.)/g, a => a.toUpperCase())
        .replace(/\s/g, '')
        .replace(/^(.)/, b => b.toLowerCase());
};