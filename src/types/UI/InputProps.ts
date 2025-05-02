export default interface InputProps<TValue = unknown> {
  id?: string;
  name?: string;
  label: string;
  value?: TValue;
  placeholder?: string;
  validationError?: string;
  gap?: number;
  requiredSign?: boolean;
}
