import { InputType, FieldProps, SelectFieldProps } from './_types';

abstract class Configurator<T extends InputType, K extends FieldProps<T>> {
  props: K;

  constructor(type: T) {
    this.props = {
      type,
      id: '',
      name: '',
      label: '',
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
}

class TextConfigurator extends Configurator<'text', FieldProps<'text'>> {
  constructor() {
    super('text');
  }
}
class SelectConfigurator extends Configurator<'select', SelectFieldProps> {
  constructor() {
    super('select');
  }
}

const field = {
  select: () => new SelectConfigurator(),
  text: () => new TextConfigurator(),
};
