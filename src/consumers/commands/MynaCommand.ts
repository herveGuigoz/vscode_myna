import * as vscode from 'vscode';
import VsCodeFileSystemService from '../../adapters/VsCodeFileSystemService';
import VsCodeInteractionsService from '../../adapters/VsCodeInteractionsService';
import OverrideArbFiles from '../../core/usecases/OverrideArbFiles';

export class MynaCommand implements vscode.Command {
    title: string;
    command: string;
    tooltip?: string | undefined;
    arguments?: any[] | undefined;

    constructor(args: any[] = []) {
        this.title = 'Add entry to arb files';
        this.command = 'extension.myna';
        this.arguments = args;
    }

    async execute(): Promise<void> {
        try {
            const interactionsService = new VsCodeInteractionsService();
            const fileSystemService = new VsCodeFileSystemService();
            const overrideArbFiles = new OverrideArbFiles(interactionsService, fileSystemService);
            await overrideArbFiles.execute();
        } catch (error) {
            vscode.window.showErrorMessage(`Error: ${error}`);
        }
    };
}