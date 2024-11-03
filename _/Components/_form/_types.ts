type BaseProps = {
  name: string;
  label: string;
  message?: string;
};

type InputType =
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

type BaseInputProps<T extends InputType, A> = BaseProps & {
  type: T;
  attributes?: A;
};

export type CheckboxProps = BaseInputProps<'checkbox', HTMLCheckboxAttributes>;
type DateProps = BaseInputProps<'date', HTMLDateAttributes>;
type EmailProps = BaseInputProps<'email', HTMLEmailAttributes>;
type FileProps = BaseInputProps<'file', HTMLFileAttributes>;
type NumberProps = BaseInputProps<'number', HTMLNumberAttributes>;
type PasswordProps = BaseInputProps<'password', HTMLPasswordAttributes>;
export type RadioProps = BaseInputProps<'radio', HTMLRadioAttributes>;
export type SelectProps = BaseInputProps<'select', HTMLSelectAttributes>;
type TelProps = BaseInputProps<'tel', HTMLTelAttributes>;
type TimeProps = BaseInputProps<'time', HTMLTimeAttributes>;
type TextProps = BaseInputProps<'text', HTMLTextAttributes>;
export type TextareaProps = BaseInputProps<'textarea', HTMLTextAreaAttributes>;

//* ATTRIBUTE TYPES
type HTMLCheckboxAttributes = Partial<Pick<HTMLInputElement, 'disabled' | 'required'>>;
type HTMLDateAttributes = Partial<
  Pick<HTMLInputElement, 'disabled' | 'max' | 'min' | 'readOnly' | 'required' | 'step'>
>;
type HTMLEmailAttributes = Partial<
  Pick<HTMLInputElement, 'disabled' | 'maxLength' | 'minLength' | 'pattern' | 'readOnly' | 'required'>
>;
type HTMLFileAttributes = Partial<Pick<HTMLInputElement, 'accept' | 'disabled' | 'capture' | 'readOnly' | 'required'>>;
type HTMLNumberAttributes = Partial<
  Pick<HTMLInputElement, 'disabled' | 'max' | 'min' | 'step' | 'readOnly' | 'required'>
>;
type HTMLPasswordAttributes = Partial<
  Pick<HTMLInputElement, 'disabled' | 'maxLength' | 'minLength' | 'pattern' | 'readOnly' | 'required'>
>;
type HTMLRadioAttributes = Partial<Pick<HTMLInputElement, 'disabled' | 'required'>>;
type HTMLSelectAttributes = Partial<Pick<HTMLSelectElement, 'disabled' | 'multiple' | 'required'>>;
type HTMLTelAttributes = Partial<
  Pick<HTMLInputElement, 'disabled' | 'maxLength' | 'minLength' | 'pattern' | 'readOnly' | 'required'>
>;
type HTMLTimeAttributes = Partial<
  Pick<HTMLInputElement, 'disabled' | 'max' | 'min' | 'readOnly' | 'required' | 'step'>
>;
type HTMLTextAttributes = Partial<
  Pick<HTMLInputElement, 'disabled' | 'maxLength' | 'minLength' | 'pattern' | 'readOnly' | 'required'>
>;
type HTMLTextAreaAttributes = Partial<
  Pick<
    HTMLTextAreaElement,
    'autocapitalize' | 'disabled' | 'maxLength' | 'minLength' | 'readOnly' | 'required' | 'spellcheck'
  >
>;

//* CONFIGURATOR
type TypeAttributesMap = {
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

type Params = [name: BaseProps['name'], label: BaseProps['label'], message?: BaseProps['message']];

class Configurator<T extends InputType> {
  props: BaseProps & {
    attributes: TypeAttributesMap[T];
  };

  constructor(...[name, label, message]: Params) {
    this.props = {
      name,
      label,
      attributes: {} as TypeAttributesMap[T],
    };
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

function LengthMixin<TBase extends Constructor<Configurator<keyof TypeAttributesMap>>>(Base: TBase) {
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

function MinMaxStepMixin<TBase extends Constructor<Configurator<keyof TypeAttributesMap>>>(Base: TBase) {
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

type PropConfig = {
  checkbox: (...args: Params) => CheckboxConfigurator;
  date: (...args: Params) => DateInputConfigurator;
  email: (...args: Params) => EmailInputConfigurator;
  file: (...args: Params) => FileInputConfigurator;
  number: (...args: Params) => NumberInputConfigurator;
  password: (...args: Params) => PasswordInputConfigurator;
  radio: (...args: Params) => RadioConfigurator;
  select: (...args: Params) => SelectConfigurator;
  time: (...args: Params) => TimeInputConfigurator;
  telephone: (...args: Params) => TelConfigurator;
  text: (...args: Params) => TextConfigurator;
  textarea: (...args: Params) => TextareaInputConfigurator;
};

type PropConfig2 = {
  [K in keyof TypeAttributesMap]: (...args: Params) => InstanceType<Constructor<Configurator<K>>>;
};

const field: PropConfig2 = {
  checkbox: (...args) => new CheckboxConfigurator(...args),
  date: (...args) => new DateInputConfigurator(...args),
  email: (...args) => new EmailInputConfigurator(...args),
  file: (...args) => new FileInputConfigurator(...args),
  number: (...args) => new NumberInputConfigurator(...args),
  password: (...args) => new PasswordInputConfigurator(...args),
  radio: (...args) => new RadioConfigurator(...args),
  select: (...args) => new SelectConfigurator(...args),
  time: (...args) => new TimeInputConfigurator(...args),
  tel: (...args) => new TelConfigurator(...args),
  text: (...args) => new TextConfigurator(...args),
  textarea: (...args) => new TextareaInputConfigurator(...args),
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

type Field = CheckboxProps | InputProps | RadioProps | SelectProps | TextareaProps;

type FieldGroup = {
  legend: string;
  fields: Field[];
};

export type FormOptions = {
  name: string;
  fields: Field[];
  autofocus?: string;
};
