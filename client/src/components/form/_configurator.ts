import { InputType, TypeAttributesMap } from './_types';

type Params = [name: string, label: string, message?: string];

class Configurator<T extends InputType> {
  props: {
    name: string;
    label: string;
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

  required(condition?: boolean) {
    if ('required' in this.props.attributes) {
      this.props.attributes.required = condition ?? true;
    }

    return this;
  }
}

type Constructor<T = {}> = new (...args: any[]) => T;

class MixinBuilder<TBase> {
  private superclass: Constructor<TBase>;

  constructor(superclass: Constructor<TBase>) {
    this.superclass = superclass;
  }

  with<M extends Array<(Base: Constructor<TBase>) => Constructor<any>>>(
    ...mixins: M
  ): Constructor<TBase & InstanceType<ReturnType<M[number]>>> {
    return mixins.reduce((c, mixin) => mixin(c), this.superclass) as Constructor<
      TBase & InstanceType<ReturnType<M[number]>>
    >;
  }
}
const mix = <T>(superclass: Constructor<T>) => new MixinBuilder(superclass);

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
class DateConfigurator extends mix(Configurator<'date'>).with(MinMaxStepMixin) {}
class EmailConfigurator extends mix(Configurator<'email'>).with(LengthMixin) {}
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
class NumberConfigurator extends mix(Configurator<'number'>).with(MinMaxStepMixin) {}
class PasswordConfigurator extends mix(Configurator<'password'>).with(LengthMixin) {
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
class TimeConfigurator extends mix(Configurator<'time'>).with(MinMaxStepMixin) {}
class TelConfigurator extends mix(Configurator<'tel'>).with(LengthMixin) {}
class TextConfigurator extends mix(Configurator<'text'>).with(LengthMixin) {}
class TextareaConfigurator extends mix(Configurator<'textarea'>).with(LengthMixin) {}

export const field = {
  checkbox: (...args: Params) => new CheckboxConfigurator(...args),
  date: (...args: Params) => new DateConfigurator(...args),
  email: (...args: Params) => new EmailConfigurator(...args),
  file: (...args: Params) => new FileConfigurator(...args),
  number: (...args: Params) => new NumberConfigurator(...args),
  password: (...args: Params) => new PasswordConfigurator(...args),
  radio: (...args: Params) => new RadioConfigurator(...args),
  select: (...args: Params) => new SelectConfigurator(...args),
  time: (...args: Params) => new TimeConfigurator(...args),
  tel: (...args: Params) => new TelConfigurator(...args),
  text: (...args: Params) => new TextConfigurator(...args),
  textarea: (...args: Params) => new TextareaConfigurator(...args),
};
