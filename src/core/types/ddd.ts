export default interface Usecase<C, T> {
    execute(command: C): T;
}