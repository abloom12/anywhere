//TODO: check attributes against MDN
//????: move config creator over
//????: move field over

//*===============================================
//* MUST MATCH
type BaseProps = {
  name: string;
  label: string;
  message?: string;
};
type Params = [name: string, label: string, message?: string];
//* MUST MATCH
//*===============================================

export type CheckboxProps = BaseProps & {
  type: 'checkbox';
  attributes?: HTMLCheckboxAttributes;
};

type DateProps = BaseProps & {
  type: 'date';
  attributes?: HTMLDateAttributes;
};

type EmailProps = BaseProps & {
  type: 'email';
  attributes?: HTMLEmailAttributes;
};

type FileProps = BaseProps & {
  type: 'file';
  attributes?: HTMLFileAttributes;
};

type ImageProps = BaseProps & {
  type: 'image';
  attributes?: HTMLImageAttributes;
};

type NumberProps = BaseProps & {
  type: 'number';
  attributes?: HTMLNumberAttributes;
};

type PasswordProps = BaseProps & {
  type: 'password';
  attributes?: HTMLPasswordAttributes;
};

export type RadioProps = BaseProps & {
  type: 'radio';
  attributes?: HTMLRadioAttributes;
};

export type SelectProps = BaseProps & {
  type: 'select';
  name: string;
  label: string;
  attributes?: HTMLSelectAttributes;
};

type TelProps = BaseProps & {
  type: 'tel';
  attributes?: HTMLTelAttributes;
};

type TimeProps = BaseProps & {
  type: 'time';
  attributes?: HTMLTimeAttributes;
};

type TextProps = BaseProps & {
  type: 'text';
  attributes?: HTMLTextAttributes;
};

export type TextareaProps = BaseProps & {
  type: 'textarea';
  name: string;
  label: string;
  attributes?: HTMLTextAreaAttributes;
};

export type PropConfig = {
  checkbox: (...args: Params) => CheckboxProps;
  date: (...args: Params) => DateProps;
  email: (...args: Params) => EmailProps;
  file: (...args: Params) => FileProps;
  image: (...args: Params) => ImageProps;
  number: (...args: Params) => NumberProps;
  password: (...args: Params) => PasswordProps;
  radio: (...args: Params) => RadioProps;
  select: (...args: Params) => SelectProps;
  time: (...args: Params) => TimeProps;
  telephone: (...args: Params) => TelProps;
  text: (...args: Params) => TextProps;
  textarea: (...args: Params) => TextareaProps;
};

export type InputProps =
  | DateProps
  | EmailProps
  | FileProps
  | ImageProps
  | NumberProps
  | PasswordProps
  | TelProps
  | TimeProps
  | TextProps;

export type Field = CheckboxProps | InputProps | RadioProps | SelectProps | TextareaProps;

type FieldGroup = {
  legend: string;
  fields: Field[];
};

export type FormOptions = {
  name: string;
  fields: Field[];
  autofocus?: string; // name of input to auto focus
};

type HTMLCheckboxAttributes = Partial<Pick<HTMLInputElement, 'disabled' | 'required'>>;
type HTMLDateAttributes = Partial<
  Pick<HTMLInputElement, 'disabled' | 'max' | 'min' | 'readOnly' | 'required' | 'step'>
>;
type HTMLEmailAttributes = Partial<
  Pick<
    HTMLInputElement,
    'disabled' | 'maxLength' | 'minLength' | 'pattern' | 'readOnly' | 'required'
  >
>;
type HTMLFileAttributes = Partial<
  Pick<HTMLInputElement, 'accept' | 'disabled' | 'capture' | 'readOnly' | 'required'>
>;
type HTMLImageAttributes = Partial<
  Pick<HTMLInputElement, 'alt' | 'disabled' | 'src' | 'formAction' | 'readOnly' | 'value'>
>;
type HTMLNumberAttributes = Partial<
  Pick<HTMLInputElement, 'disabled' | 'max' | 'min' | 'step' | 'readOnly' | 'required'>
>;
type HTMLPasswordAttributes = Partial<
  Pick<
    HTMLInputElement,
    'disabled' | 'maxLength' | 'minLength' | 'pattern' | 'readOnly' | 'required'
  >
>;
type HTMLRadioAttributes = Partial<Pick<HTMLInputElement, 'disabled' | 'required' | 'value'>>;
type HTMLSelectAttributes = Partial<Pick<HTMLSelectElement, 'disabled' | 'multiple' | 'required'>>;
type HTMLTelAttributes = Partial<
  Pick<
    HTMLInputElement,
    'disabled' | 'maxLength' | 'minLength' | 'pattern' | 'readOnly' | 'required'
  >
>;
type HTMLTimeAttributes = Partial<
  Pick<HTMLInputElement, 'disabled' | 'max' | 'min' | 'readOnly' | 'required' | 'step'>
>;
type HTMLTextAttributes = Partial<
  Pick<
    HTMLInputElement,
    'disabled' | 'maxLength' | 'minLength' | 'pattern' | 'readOnly' | 'required'
  >
>;
type HTMLTextAreaAttributes = Partial<
  Pick<
    HTMLTextAreaElement,
    | 'autocapitalize'
    | 'disabled'
    | 'maxLength'
    | 'minLength'
    | 'readOnly'
    | 'required'
    | 'spellcheck'
  >
>;

type TypeAttributesMap = {
  checkbox: HTMLCheckboxAttributes;
  date: HTMLDateAttributes;
  email: HTMLEmailAttributes;
  file: HTMLFileAttributes;
  image: HTMLImageAttributes;
  number: HTMLNumberAttributes;
  password: HTMLPasswordAttributes;
  radio: HTMLRadioAttributes;
  select: HTMLSelectAttributes;
  tel: HTMLTelAttributes;
  text: HTMLTextAttributes;
  time: HTMLTimeAttributes;
  textarea: HTMLTextAreaAttributes;
};

type Type =
  | 'checkbox'
  | 'date'
  | 'email'
  | 'file'
  | 'image'
  | 'number'
  | 'password'
  | 'radio'
  | 'select'
  | 'tel'
  | 'text'
  | 'time'
  | 'textarea';

class Configurator<T extends Type> {
  #props: {
    type: T;
    name: string;
    label: string;
    attributes: TypeAttributesMap[T];
  };

  constructor(type: T, name: string, label: string) {
    this.#props = { type, name, label, attributes: {} as TypeAttributesMap[T] };
  }

  get $() {
    return this.#props;
  }

  readonly(condition?: boolean) {
    if ('readOnly' in this.#props.attributes) {
      this.#props.attributes.readOnly = condition ?? true;
    }

    return this;
  }

  required(condition?: boolean) {
    if ('required' in this.#props.attributes) {
      this.#props.attributes.required = condition ?? true;
    }

    return this;
  }
}
