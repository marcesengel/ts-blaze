export interface Validator<T> {
  (value: any): value is T;
}
