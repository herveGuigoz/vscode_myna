import * as vscode from 'vscode';

export class MynaActionProvider implements vscode.CodeActionProvider {

    command: vscode.Command;
    selector: vscode.DocumentSelector;
    metadata: vscode.CodeActionProviderMetadata;

    constructor (command: vscode.Command) {
        this.command = command;
        this.selector = { scheme: 'file', language: 'dart' };
        this.metadata = { providedCodeActionKinds: [vscode.CodeActionKind.QuickFix] };
    }

    provideCodeActions(document: vscode.TextDocument, range: vscode.Range | vscode.Selection, context: vscode.CodeActionContext, token: vscode.CancellationToken): vscode.ProviderResult<(vscode.CodeAction | vscode.Command)[]> {
        return [{
            title: this.command.title,
            command: this.command.command,
            arguments: [range]
        }];
    }
    
    resolveCodeAction?(codeAction: vscode.CodeAction, token: vscode.CancellationToken): vscode.ProviderResult<vscode.CodeAction> {
        throw new Error('Method not implemented.');
    }
}