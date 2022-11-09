export type ValidationCallback = (text: string) => string | undefined;

export type InputOptions = {
    placeHolder: string,
    default?: string,
    validate?: ValidationCallback
};

export default interface InteractionsService {
    getSelection(): Promise<string | undefined>;

    replaceSelection(value: string): void;

    requestInput(options: InputOptions): Promise<string | undefined>;
}