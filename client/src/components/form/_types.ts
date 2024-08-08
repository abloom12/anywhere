type BaseProps = {
  name: string;
  label: string;
};

export type CheckboxProps = BaseProps & {
  type: 'checkbox';
  attributes?: Array<
    Record<
      keyof Partial<
        Pick<HTMLInputElement, 'autofocus' | 'checked' | 'disabled' | 'name' | 'required' | 'value'>
      >,
      any
    >
  >;
};

type DateProps = BaseProps & {
  type: 'date';
  attributes?: Array<
    Record<
      keyof Partial<
        Pick<HTMLInputElement, 'autofocus' | 'min' | 'max' | 'step' | 'readOnly' | 'required'>
      >,
      any
    >
  >;
};

type EmailProps = BaseProps & {
  type: 'email';
  attributes?: Array<
    Record<
      keyof Partial<
        Pick<
          HTMLInputElement,
          | 'autofocus'
          | 'maxLength'
          | 'minLength'
          | 'multiple'
          | 'pattern'
          | 'placeholder'
          | 'readOnly'
          | 'required'
        >
      >,
      any
    >
  >;
};

type FileProps = BaseProps & {
  type: 'file';
  attributes?: Array<
    Record<
      keyof Partial<
        Pick<
          HTMLInputElement,
          'accept' | 'autofocus' | 'multiple' | 'required' | 'capture' | 'list'
        >
      >,
      any
    >
  >;
};

type ImageProps = BaseProps & {
  type: 'image';
  attributes?: Array<
    Record<
      keyof Partial<
        Pick<
          HTMLInputElement,
          'autofocus' | 'src' | 'alt' | 'height' | 'width' | 'formAction' | 'name' | 'value'
        >
      >,
      any
    >
  >;
};

type NumberProps = BaseProps & {
  type: 'number';
  attributes?: Array<
    Record<
      keyof Partial<
        Pick<
          HTMLInputElement,
          'autofocus' | 'min' | 'max' | 'step' | 'readOnly' | 'required' | 'placeholder'
        >
      >,
      any
    >
  >;
};

type PasswordProps = BaseProps & {
  type: 'password';
  attributes?: Array<
    Record<
      keyof Partial<
        Pick<
          HTMLInputElement,
          | 'autofocus'
          | 'maxLength'
          | 'minLength'
          | 'pattern'
          | 'placeholder'
          | 'readOnly'
          | 'required'
          | 'size'
        >
      >,
      any
    >
  >;
};

export type RadioProps = BaseProps & {
  type: 'radio';
  attributes?: Array<
    Record<
      keyof Partial<
        Pick<HTMLInputElement, 'autofocus' | 'checked' | 'disabled' | 'name' | 'required' | 'value'>
      >,
      any
    >
  >;
};

export type SelectProps = BaseProps & {
  type: 'select';
  name: string;
  label: string;
  attributes?: Array<
    Partial<
      Record<
        keyof Partial<
          Pick<
            HTMLSelectElement,
            'autofocus' | 'disabled' | 'multiple' | 'name' | 'required' | 'size'
          >
        >,
        any
      >
    >
  >;
};

type TelProps = BaseProps & {
  type: 'tel';
  attributes?: Array<
    Record<
      keyof Partial<
        Pick<
          HTMLInputElement,
          | 'autofocus'
          | 'maxLength'
          | 'minLength'
          | 'pattern'
          | 'placeholder'
          | 'readOnly'
          | 'required'
        >
      >,
      any
    >
  >;
};

type TimeProps = BaseProps & {
  type: 'time';
  attributes?: Array<
    Record<
      keyof Partial<
        Pick<HTMLInputElement, 'autofocus' | 'min' | 'max' | 'step' | 'readOnly' | 'required'>
      >,
      any
    >
  >;
};

type TextProps = BaseProps & {
  type: 'text';
  attributes?: Array<
    Record<
      keyof Partial<
        Pick<
          HTMLInputElement,
          'maxLength' | 'minLength' | 'pattern' | 'placeholder' | 'readOnly' | 'required' | 'size'
        >
      >,
      any
    >
  >;
};

export type TextareaProps = BaseProps & {
  type: 'textarea';
  name: string;
  label: string;
  attributes?: Array<
    Partial<
      Record<
        keyof Partial<
          Pick<
            HTMLTextAreaElement,
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
        >,
        any
      >
    >
  >;
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
};
