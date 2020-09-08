export abstract class BaseUseCase<Input = void, Output = void> {
  abstract execute(input: Input): Promise<Output>;
}
