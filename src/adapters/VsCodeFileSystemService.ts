import * as vscode from 'vscode';
import * as yaml from 'yaml';
import FileSystemService from '../core/ports/FileSystemService';

export default class VsCodeFileSystemService implements FileSystemService {
    async findFiles(pattern: string): Promise<string[]> {
        const folder = vscode.workspace.workspaceFolders?.[0];

        if (!folder) {
            throw new Error(`The workspace folder was not found.`);
        }

        const relativePattern = new vscode.RelativePattern(folder, pattern);
        const files = await vscode.workspace.findFiles(relativePattern);

        if (files.length === 0) {
            throw new Error(`No ${pattern} was found in the current workspace.`);
        }

        return files.map((uri) => uri.path);
    }

    async readYamlFile(filePath: string, key: string): Promise<string> {
        const textDocument = await vscode.workspace.openTextDocument(vscode.Uri.parse(filePath));
        return yaml.parseDocument(textDocument.getText()).get(key) as string;
    }

    async appendToFiles(filesPaths: string[], json: Map<string, any>): Promise<void> {
        const documents: Thenable<vscode.TextDocument>[] = [];

        filesPaths.forEach((file) => {
            documents.push(vscode.workspace.openTextDocument(file));
        });

        const workspaceEdit = new vscode.WorkspaceEdit();

        const contents = await Promise.all(documents);

        contents.forEach((content, index) => {
            const map = new Map(
                Object.entries<string>(JSON.parse(content.getText()) as string),
            );

            json.forEach((value, key) => {
                map.set(key, value);
            });

            workspaceEdit.replace(
                vscode.Uri.parse(filesPaths[index]),
                new vscode.Range(
                    new vscode.Position(0, 0),
                    new vscode.Position(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
                ),
                JSON.stringify(Object.fromEntries(map), null, 2)
            );
        });

        await vscode.workspace.applyEdit(workspaceEdit);
        await vscode.workspace.saveAll(true);
    }
}