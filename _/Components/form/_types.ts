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

type HTMLAttributeTypes = {
  [K in keyof AttributeConfig]: Partial<Pick<HTMLInputElement, AttributeConfig[K]>>;
} & {
  select: Partial<Pick<HTMLSelectElement, AttributeConfig['select']>>;
  textarea: Partial<Pick<HTMLTextAreaElement, AttributeConfig['textarea']>>;
};

type CheckboxAttributes = HTMLAttributeTypes['checkbox'];
type DateAttributes = HTMLAttributeTypes['date'];
type EmailAttributes = HTMLAttributeTypes['email'];
type FileAttributes = HTMLAttributeTypes['file'];
type NumberAttributes = HTMLAttributeTypes['number'];
type PasswordAttributes = HTMLAttributeTypes['password'];
type RadioAttributes = HTMLAttributeTypes['radio'];
type SelectAttributes = HTMLAttributeTypes['select'];
type TelAttributes = HTMLAttributeTypes['tel'];
type TimeAttributes = HTMLAttributeTypes['time'];
type TextAttributes = HTMLAttributeTypes['text'];
type TextAreaAttributes = HTMLAttributeTypes['textarea'];

export type TypeAttributesMap = {
  checkbox: CheckboxAttributes;
  date: DateAttributes;
  email: EmailAttributes;
  file: FileAttributes;
  number: NumberAttributes;
  password: PasswordAttributes;
  radio: RadioAttributes;
  select: SelectAttributes;
  tel: TelAttributes;
  text: TextAttributes;
  time: TimeAttributes;
  textarea: TextAreaAttributes;
};

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

export type FieldProps<T extends InputType> = {
  type: T;
  id: string;
  name: string;
  label: string;
  attributes: Partial<TypeAttributesMap[T]>;
};

export type Field =
  | FieldProps<'checkbox'>
  | FieldProps<'date'>
  | FieldProps<'email'>
  | FieldProps<'file'>
  | FieldProps<'number'>
  | FieldProps<'password'>
  | FieldProps<'radio'>
  | FieldProps<'select'>
  | FieldProps<'tel'>
  | FieldProps<'time'>
  | FieldProps<'text'>
  | FieldProps<'textarea'>;

export type FieldGroup = {
  legend: string;
  fields: Field[];
};
