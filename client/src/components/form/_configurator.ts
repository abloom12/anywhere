import { uniqueId } from '@/util/uniqueId';
import { FieldProps, InputType, SelectFieldProps, TextareaFieldProps } from './_types';

type params = [name: string, label: string];

abstract class Configurator<T extends InputType, K extends FieldProps<T>> {
  props: K;

  constructor(type: T, [name, label]: params) {
    this.props = {
      type,
      id: uniqueId(),
      name,
      label,
      attributes: {},
    } as K;
  }

  get $(): K {
    return this.props;
  }

  disabled(condition?: boolean) {
    this.props.attributes.disabled = condition ?? true;
    return this;
  }
  required(condition?: boolean) {
    this.props.attributes.required = condition ?? true;
    return this;
  }
}

class CheckboxConfigurator extends Configurator<'checkbox', FieldProps<'checkbox'>> {
  constructor(args: params) {
    super('checkbox', args);
  }
}
class DateConfigurator extends Configurator<'date', FieldProps<'date'>> {
  constructor(args: params) {
    super('date', args);
  }
}
class EmailConfigurator extends Configurator<'email', FieldProps<'email'>> {
  constructor(args: params) {
    super('email', args);
  }
}
class FileConfigurator extends Configurator<'file', FieldProps<'file'>> {
  constructor(args: params) {
    super('file', args);
  }

  accept(value: string) {
    this.props.attributes.accept = value;
    return this;
  }

  capture(value: string) {
    this.props.attributes.capture = value;
    return this;
  }
}
class NumberConfigurator extends Configurator<'number', FieldProps<'number'>> {
  constructor(args: params) {
    super('number', args);
  }
}
class PasswordConfigurator extends Configurator<'password', FieldProps<'password'>> {
  constructor(args: params) {
    super('password', args);
  }
}
class RadioConfigurator extends Configurator<'radio', FieldProps<'radio'>> {
  constructor(args: params) {
    super('radio', args);
  }
}
class SelectConfigurator extends Configurator<'select', SelectFieldProps> {
  constructor(args: params) {
    super('select', args);
  }

  data(data: []) {
    this.props.data = data;
  }

  multiple(value: boolean) {
    this.props.attributes.multiple = value;
    return this;
  }
}
class TimeConfigurator extends Configurator<'time', FieldProps<'time'>> {
  constructor(args: params) {
    super('time', args);
  }
}
class TelConfigurator extends Configurator<'tel', FieldProps<'tel'>> {
  constructor(args: params) {
    super('tel', args);
  }
}
class TextConfigurator extends Configurator<'text', FieldProps<'text'>> {
  constructor(args: params) {
    super('text', args);
  }
}
class TextareaConfigurator extends Configurator<'textarea', TextareaFieldProps> {
  constructor(args: params) {
    super('textarea', args);
  }

  minlength(length: number) {
    this.props.attributes.minLength = length;
    return this;
  }
  maxlength(length: number) {
    this.props.attributes.maxLength = length;
    return this;
  }
}

const field = {
  checkbox: (...args: params) => new CheckboxConfigurator(args),
  date: (...args: params) => new DateConfigurator(args),
  email: (...args: params) => new EmailConfigurator(args),
  file: (...args: params) => new FileConfigurator(args),
  number: (...args: params) => new NumberConfigurator(args),
  password: (...args: params) => new PasswordConfigurator(args),
  radio: (...args: params) => new RadioConfigurator(args),
  select: (...args: params) => new SelectConfigurator(args),
  time: (...args: params) => new TimeConfigurator(args),
  tel: (...args: params) => new TelConfigurator(args),
  text: (...args: params) => new TextConfigurator(args),
  textarea: (...args: params) => new TextareaConfigurator(args),
};
