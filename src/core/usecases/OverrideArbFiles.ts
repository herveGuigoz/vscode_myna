import Translation from '../entities/Translation';
import FileSystemService from '../ports/FileSystemService';
import InteractionsService from '../ports/InteractionsService';
import Usecase from '../types/ddd';

export type OverrideArbFilesCommand = {
    selection?: string,
};

export default class OverrideArbFiles implements Usecase<OverrideArbFilesCommand, Promise<void>> {
    constructor(
        private readonly interactionsService: InteractionsService,
        private readonly fileSystemService: FileSystemService,
    ) {}

    nonEmptyString(text: string): string | undefined {
        if (text.trim() === '') {
            return 'Please enter';
        }
    };

    async execute(command: OverrideArbFilesCommand = {}): Promise<void> {     
        const selection = command.selection ?? await this.interactionsService.getSelection();
        
        const configuration = await this.fileSystemService.findFiles('l10n.yaml');
        
        const directory = await this.fileSystemService.readYamlFile(configuration[0], 'arb-dir');
   
        const files = await this.fileSystemService.findFiles(`${directory}/*.arb`);

        const key = await this.interactionsService.requestInput({
            placeHolder: 'Key', 
            validate: this.nonEmptyString,
        });

        const value = await this.interactionsService.requestInput({
            placeHolder: 'Value',
            default: selection,
            validate: this.nonEmptyString,
        });

        const description = await this.interactionsService.requestInput({
            placeHolder: 'Description',
        });

        if (!key || !value) {
            return;
        }

        const translation = new Translation({ key: key, value: value, description: description ?? ''});

        await this.fileSystemService.appendToFiles(files, translation.toJson);

        if (selection) {
            this.interactionsService.replaceSelection(`context.l10n.${key}`);
        }
    }
}