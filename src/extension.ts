// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { MynaActionProvider } from './consumers/actions/MynaActionProvider';
import { MynaCommand } from './consumers/commands/MynaCommand';

// This method is called when the extension is activated
// The extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const mynaCommand = new MynaCommand();
	const action = new MynaActionProvider(mynaCommand);

	context.subscriptions.push(
		vscode.languages.registerCodeActionsProvider(action.selector, action, action.metadata),
	);

	context.subscriptions.push(
		vscode.commands.registerCommand(mynaCommand.command, mynaCommand.execute),
	);
}

// This method is called when the extension is deactivated
export function deactivate() { }

