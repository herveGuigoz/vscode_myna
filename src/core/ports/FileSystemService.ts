export default interface FileSystemService {
    findFiles(pattern: string): Promise<string[]>;

    readYamlFile(filePath: string, key: string): Promise<string>;

    appendToFiles(filesPaths: string[], json: Map<string, any>): Promise<void>;
}