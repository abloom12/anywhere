export type InputType =
  | 'checkbox'
  | 'date'
  | 'email'
  | 'file'
  | 'number'
  | 'password'
  | 'radio'
  | 'select'
  | 'tel'
  | 'text'
  | 'time'
  | 'textarea';

type AttributeConfig = {
  checkbox: 'disabled' | 'required';
  date: 'disabled' | 'max' | 'min' | 'readOnly' | 'required' | 'step';
  email: 'disabled' | 'maxLength' | 'minLength' | 'readOnly' | 'required';
  file: 'accept' | 'disabled' | 'capture' | 'readOnly' | 'required';
  number: 'disabled' | 'max' | 'min' | 'step' | 'readOnly' | 'required';
  password: 'disabled' | 'maxLength' | 'minLength' | 'readOnly' | 'required';
  radio: 'disabled' | 'required';
  select: 'disabled' | 'multiple' | 'required';
  tel: 'disabled' | 'maxLength' | 'minLength' | 'readOnly' | 'required';
  time: 'disabled' | 'max' | 'min' | 'readOnly' | 'required' | 'step';
  text: 'disabled' | 'maxLength' | 'minLength' | 'readOnly' | 'required';
  textarea: 'disabled' | 'maxLength' | 'minLength' | 'readOnly' | 'required';
};

type AttributeConfigKeys = keyof AttributeConfig;

type HTMLAttributeTypes = {
  [K in Exclude<AttributeConfigKeys, 'select' | 'textarea'>]: Partial<
    Pick<HTMLInputElement, AttributeConfig[K]>
  >;
} & {
  select: Partial<Pick<HTMLSelectElement, AttributeConfig['select']>>;
  textarea: Partial<Pick<HTMLTextAreaElement, AttributeConfig['textarea']>>;
};

export type FieldProps<T extends InputType> = {
  type: T;
  id: string;
  name: string;
  label: string;
  attributes: Partial<HTMLAttributeTypes[T]>;
};

export type SelectFieldProps = FieldProps<'select'> & {
  data?: [];
};

export type TextareaFieldProps = FieldProps<'textarea'> & {
  autosize?: boolean;
};

export type Field =
  | FieldProps<'checkbox'>
  | FieldProps<'date'>
  | FieldProps<'email'>
  | FieldProps<'file'>
  | FieldProps<'number'>
  | FieldProps<'password'>
  | FieldProps<'radio'>
  | FieldProps<'tel'>
  | FieldProps<'time'>
  | FieldProps<'text'>
  | SelectFieldProps
  | TextareaFieldProps;
