type AttributeConfig = {
  checkbox: 'disabled' | 'required';
  date: 'disabled' | 'max' | 'min' | 'readOnly' | 'required' | 'step';
  email: 'disabled' | 'maxLength' | 'minLength' | 'readOnly' | 'required';
  file: 'accept' | 'disabled' | 'capture' | 'readOnly' | 'required';
  number: 'disabled' | 'max' | 'min' | 'step' | 'readOnly' | 'required';
  password: 'disabled' | 'maxLength' | 'minLength' | 'pattern' | 'readOnly' | 'required';
  radio: 'disabled' | 'required';
  select: 'disabled' | 'multiple' | 'required';
  tel: 'disabled' | 'maxLength' | 'minLength' | 'pattern' | 'readOnly' | 'required';
  time: 'disabled' | 'max' | 'min' | 'readOnly' | 'required' | 'step';
  text: 'disabled' | 'maxLength' | 'minLength' | 'pattern' | 'readOnly' | 'required';
  textArea: 'disabled' | 'maxLength' | 'minLength' | 'readOnly' | 'required';
};

type HTMLAttributeTypes = {
  [K in keyof AttributeConfig]: Partial<Pick<HTMLInputElement, AttributeConfig[K]>>;
} & {
  select: Partial<Pick<HTMLSelectElement, AttributeConfig['select']>>;
  textArea: Partial<Pick<HTMLTextAreaElement, AttributeConfig['textArea']>>;
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
type TextAreaAttributes = Partial<
  Pick<HTMLInputElement, 'disabled' | 'maxLength' | 'minLength' | 'readOnly' | 'required'>
>;

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
  name: string;
  label: string;
  type: T;
  attributes?: TypeAttributesMap[T];
  message?: string;
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
