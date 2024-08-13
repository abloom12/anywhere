//TODO: check attributes against MDN
//????: move config creator over
//????: move field over

//* MUST MATCH
type BaseProps = {
  name: string;
  label: string;
  message?: string;
};
type Params = [name: string, label: string, message?: string];
//* MUST MATCH

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

//* FORM
export type InputProps =
  | DateProps
  | EmailProps
  | FileProps
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

//* ATTRIBUTE TYPES
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
type HTMLNumberAttributes = Partial<
  Pick<HTMLInputElement, 'disabled' | 'max' | 'min' | 'step' | 'readOnly' | 'required'>
>;
type HTMLPasswordAttributes = Partial<
  Pick<
    HTMLInputElement,
    'disabled' | 'maxLength' | 'minLength' | 'pattern' | 'readOnly' | 'required'
  >
>;
type HTMLRadioAttributes = Partial<Pick<HTMLInputElement, 'disabled' | 'required'>>;
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

//* CONFIGURATOR
export type TypeAttributesMap = {
  checkbox: HTMLCheckboxAttributes;
  date: HTMLDateAttributes;
  email: HTMLEmailAttributes;
  file: HTMLFileAttributes;
  number: HTMLNumberAttributes;
  password: HTMLPasswordAttributes;
  radio: HTMLRadioAttributes;
  select: HTMLSelectAttributes;
  tel: HTMLTelAttributes;
  text: HTMLTextAttributes;
  time: HTMLTimeAttributes;
  textarea: HTMLTextAreaAttributes;
};

export type Type =
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

class Configurator<T extends Type> {
  props: {
    name: string;
    label: string;
    attributes: TypeAttributesMap[T];
  };

  constructor(name: string, label: string) {
    this.props = { name, label, attributes: {} as TypeAttributesMap[T] };
  }

  get $() {
    return this.props;
  }

  disabled(condition?: boolean) {
    if ('disabled' in this.props.attributes) {
      this.props.attributes.disabled = condition ?? true;
    }

    return this;
  }

  readonly(condition?: boolean) {
    if ('readOnly' in this.props.attributes) {
      this.props.attributes.readOnly = condition ?? true;
    }

    return this;
  }

  required(condition?: boolean) {
    if ('required' in this.props.attributes) {
      this.props.attributes.required = condition ?? true;
    }

    return this;
  }
}

// Utility type for a mixin constructor
type Constructor<T = {}> = new (...args: any[]) => T;

function LengthMixin<TBase extends Constructor<Configurator<keyof TypeAttributesMap>>>(
  Base: TBase,
) {
  return class extends Base {
    minlength(length: number) {
      if ('minLength' in this.props.attributes) {
        this.props.attributes.minLength = length;
      }
      return this;
    }

    maxlength(length: number) {
      if ('maxLength' in this.props.attributes) {
        this.props.attributes.maxLength = length;
      }
      return this;
    }
  };
}

function MinMaxStepMixin<TBase extends Constructor<Configurator<keyof TypeAttributesMap>>>(
  Base: TBase,
) {
  return class extends Base {
    min(value: string) {
      if ('min' in this.props.attributes) {
        this.props.attributes.min = value;
      }
      return this;
    }

    max(value: string) {
      if ('max' in this.props.attributes) {
        this.props.attributes.max = value;
      }
      return this;
    }

    step(value: string) {
      if ('step' in this.props.attributes) {
        this.props.attributes.step = value;
      }
      return this;
    }
  };
}

class CheckboxConfigurator extends Configurator<'checkbox'> {}
class DateInputConfigurator extends MinMaxStepMixin(Configurator<'date'>) {}
class EmailInputConfigurator extends LengthMixin(Configurator<'email'>) {
  pattern(value: string) {
    this.props.attributes.pattern = value;
    return this;
  }
}
class FileInputConfigurator extends Configurator<'file'> {
  accept(value: string) {
    this.props.attributes.accept = value;
    return this;
  }

  capture(value: string) {
    this.props.attributes.capture = value;
    return this;
  }
}
class NumberInputConfigurator extends MinMaxStepMixin(Configurator<'number'>) {}
class PasswordInputConfigurator extends LengthMixin(Configurator<'password'>) {
  pattern(value: string) {
    this.props.attributes.pattern = value;
    return this;
  }
}
class RadioConfigurator extends Configurator<'radio'> {}
class SelectConfigurator extends Configurator<'select'> {
  multiple(value: boolean) {
    this.props.attributes.multiple = value;
    return this;
  }
}
class TimeInputConfigurator extends MinMaxStepMixin(Configurator<'time'>) {}
class TelConfigurator extends LengthMixin(Configurator<'tel'>) {
  pattern(value: string) {
    this.props.attributes.pattern = value;
    return this;
  }
}
class TextConfigurator extends LengthMixin(Configurator<'text'>) {
  pattern(value: string) {
    this.props.attributes.pattern = value;
    return this;
  }
}
class TextareaInputConfigurator extends LengthMixin(Configurator<'textarea'>) {
  autocapitalize(value: string) {
    this.props.attributes.autocapitalize = value;
    return this;
  }

  spellcheck(value: boolean) {
    this.props.attributes.spellcheck = value;
    return this;
  }
}

export type PropConfig = {
  checkbox: (...args: Params) => CheckboxProps;
  date: (...args: Params) => DateProps;
  email: (...args: Params) => EmailProps;
  file: (...args: Params) => FileProps;
  number: (...args: Params) => NumberProps;
  password: (...args: Params) => PasswordProps;
  radio: (...args: Params) => RadioProps;
  select: (...args: Params) => SelectProps;
  time: (...args: Params) => TimeProps;
  telephone: (...args: Params) => TelProps;
  text: (...args: Params) => TextProps;
  textarea: (...args: Params) => TextareaProps;
};

const field: PropConfig = {
  checkbox: (name, label) => ({
    type: 'checkbox',
    name,
    label,
  }),
  date: (name, label) => ({
    type: 'date',
    name,
    label,
  }),
  email: (name, label) => ({
    type: 'email',
    name,
    label,
  }),
  file: (name, label) => ({
    type: 'file',
    name,
    label,
  }),
  number: (name, label) => ({
    type: 'number',
    name,
    label,
  }),
  password: (name, label) => ({
    type: 'password',
    name,
    label,
  }),
  radio: (name, label) => ({
    type: 'radio',
    name,
    label,
  }),
  select: (name, label) => ({
    type: 'select',
    name,
    label,
  }),
  telephone: (name, label) => ({
    type: 'tel',
    name,
    label,
  }),
  time: (name, label) => ({
    type: 'time',
    name,
    label,
  }),
  text: (name, label) => ({
    type: 'text',
    name,
    label,
  }),
  textarea: (name, label) => ({
    type: 'textarea',
    name,
    label,
  }),
};
