export abstract class BaseUsecase<TInput, TResult> {
  abstract execute(input: TInput): Promise<TResult>
}
