export type InputProps = {
  type: HTMLInputType;
  name: string;
  label: string;
  attributes?: Array<Partial<Record<keyof HTMLInputAttributes, any>>>;
};

export type SelectProps = {
  type: 'select';
  name: string;
  label: string;
  attributes?: Array<Partial<Record<keyof HTMLSelectAttributes, any>>>;
};

export type TextareaProps = {
  type: 'textarea';
  name: string;
  label: string;
  attributes?: Array<Partial<Record<keyof HTMLTextAreaAttributes, any>>>;
};

export type CheckboxProps = {
  type: 'checkbox';
  name: string;
  label: string;
  attributes?: Array<Partial<Record<keyof HTMLCheckboxAttributes, any>>>;
};

export type RadioProps = {
  type: 'radio';
  name: string;
  label: string;
  attributes?: Array<Partial<Record<keyof HTMLRadioAttributes, any>>>;
};

export type Field = InputProps | SelectProps | TextareaProps | CheckboxProps | RadioProps;

type FieldGroup = {
  legend: string;
  fields: Field[];
};

export type FormOptions = {
  name: string;
  fields: Field[];
};

export type HTMLInputType =
  | 'date'
  | 'email'
  | 'file'
  | 'image'
  | 'number'
  | 'password'
  | 'tel'
  | 'text'
  | 'time';

type HTMLInputAttributes = Partial<
  Pick<
    HTMLInputElement,
    | 'accept'
    | 'alt'
    | 'autocomplete'
    | 'autofocus'
    | 'dirName'
    | 'disabled'
    | 'list'
    | 'max'
    | 'maxLength'
    | 'min'
    | 'minLength'
    | 'multiple'
    | 'name'
    | 'pattern'
    | 'placeholder'
    | 'readOnly'
    | 'required'
    | 'size'
    | 'src'
    | 'step'
    | 'type'
    | 'value'
    | 'inputMode'
  >
>;

type HTMLSelectAttributes = Partial<
  Pick<
    HTMLSelectElement,
    'autocomplete' | 'autofocus' | 'disabled' | 'multiple' | 'name' | 'required' | 'size'
  >
>;

type HTMLTextAreaAttributes = Partial<
  Pick<
    HTMLTextAreaElement,
    | 'autocomplete'
    | 'autofocus'
    | 'dirName'
    | 'disabled'
    | 'maxLength'
    | 'minLength'
    | 'name'
    | 'placeholder'
    | 'readOnly'
    | 'required'
    | 'wrap'
  >
>;

type HTMLRadioAttributes = Partial<
  Pick<HTMLInputElement, 'autofocus' | 'checked' | 'disabled' | 'name' | 'required' | 'value'>
>;

type HTMLCheckboxAttributes = Partial<
  Pick<HTMLInputElement, 'autofocus' | 'checked' | 'disabled' | 'name' | 'required' | 'value'>
>;
