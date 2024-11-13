import { FieldProps, InputType, TypeAttributesMap } from './_types';
import { uniqueId } from '@/util/uniqueId';

class Configurator<T extends InputType> {
  props: FieldProps<T>;

  constructor(name: string, label: string, type: T) {
    this.props = {
      type,
      id: uniqueId(),
      name,
      label,
      attributes: {} as TypeAttributesMap[T],
    };
  }

  get $(): FieldProps<T> {
    return this.props;
  }

  disabled(condition?: boolean) {
    if ('disabled' in this.props.attributes) {
      this.props.attributes.disabled = condition ?? true;
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
function MinMaxStepMixin<
  TBase extends Constructor<Configurator<keyof TypeAttributesMap>>,
>(Base: TBase) {
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
class DateConfigurator extends MinMaxStepMixin(Configurator<'date'>) {}
class EmailConfigurator extends LengthMixin(Configurator<'email'>) {}
class FileConfigurator extends Configurator<'file'> {
  accept(value: string) {
    this.props.attributes.accept = value;
    return this;
  }

  capture(value: string) {
    this.props.attributes.capture = value;
    return this;
  }
}
class NumberConfigurator extends MinMaxStepMixin(Configurator<'number'>) {}
class PasswordConfigurator extends LengthMixin(Configurator<'password'>) {}
class RadioConfigurator extends Configurator<'radio'> {}
class SelectConfigurator extends Configurator<'select'> {
  multiple(value: boolean) {
    this.props.attributes.multiple = value;
    return this;
  }
}
class TimeConfigurator extends MinMaxStepMixin(Configurator<'time'>) {}
class TelConfigurator extends LengthMixin(Configurator<'tel'>) {}
class TextConfigurator extends LengthMixin(Configurator<'text'>) {}
class TextareaConfigurator extends LengthMixin(Configurator<'textarea'>) {}

export const field = {
  checkbox: (name: string, label: string) =>
    new CheckboxConfigurator(name, label, 'checkbox'),
  date: (name: string, label: string) => new DateConfigurator(name, label, 'date'),
  email: (name: string, label: string) => new EmailConfigurator(name, label, 'email'),
  file: (name: string, label: string) => new FileConfigurator(name, label, 'file'),
  number: (name: string, label: string) => new NumberConfigurator(name, label, 'number'),
  password: (name: string, label: string) =>
    new PasswordConfigurator(name, label, 'password'),
  radio: (name: string, label: string) => new RadioConfigurator(name, label, 'radio'),
  select: (name: string, label: string) => new SelectConfigurator(name, label, 'select'),
  time: (name: string, label: string) => new TimeConfigurator(name, label, 'time'),
  tel: (name: string, label: string) => new TelConfigurator(name, label, 'tel'),
  text: (name: string, label: string) => new TextConfigurator(name, label, 'text'),
  textarea: (name: string, label: string) =>
    new TextareaConfigurator(name, label, 'textarea'),
};
