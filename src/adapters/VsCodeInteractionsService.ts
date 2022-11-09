import * as vscode from 'vscode';
import InteractionsService, { InputOptions } from '../core/ports/InteractionsService';

export default class VsCodeInteractionsService implements InteractionsService {
    async getSelection(): Promise<string | undefined> {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            return editor.document.getText(editor.selection).replace(/(^['|"])|('|"$)/g, '');
        }
    }

    replaceSelection(value: string): void {
        const editor = vscode.window.activeTextEditor;

        if (!editor) {
            throw new Error(`An error occured.`);
        }

        editor.edit(builder => {
            builder.replace(editor.selection, value);
        });
    }

    async requestInput(options: InputOptions): Promise<string | undefined> {
        const input = await vscode.window.showInputBox({
            ignoreFocusOut: true,
            placeHolder: options.placeHolder,
            value: options.default,
            validateInput: options.validate
        });

        return input;
    }
}