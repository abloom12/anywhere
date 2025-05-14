import { uniqueId } from '@/shared/util/unique-id';
import { Props as InputProps, InputType } from '@/shared/components/ui/Input';
import { Props as CheckboxProps } from '@/shared/components/ui/Checkbox';
import { Props as RadioProps } from '@/shared/components/ui/Radio';
import { Props as SelectProps } from '@/shared/components/ui/Select';
import { Props as TextareaProps } from '@/shared/components/ui/Textarea';
import { Props as ButtonProps } from '@/shared/components/ui/Button';

type FieldType = InputType | 'checkbox' | 'radio' | 'select' | 'textarea';

type params = [name: string, label: string];

abstract class FieldConfigurator<
  T extends FieldType,
  K extends {
    checkbox: CheckboxProps;
    radio: RadioProps;
    select: SelectProps;
    textarea: TextareaProps;
    date: InputProps<'date'>;
    email: InputProps<'email'>;
    file: InputProps<'file'>;
    number: InputProps<'number'>;
    password: InputProps<'password'>;
    tel: InputProps<'tel'>;
    text: InputProps<'text'>;
    time: InputProps<'time'>;
  }[T],
> {
  props: K;
  label: string;

  constructor(type: T, [name, label]: params) {
    this.props = {
      type,
      id: uniqueId(),
      name,
      attributes: {},
    } as K;

    this.label = label;
  }

  get $(): K & { label: string } {
    return { ...this.props, label: this.label };
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

class CheckboxConfigurator extends FieldConfigurator<'checkbox', CheckboxProps> {
  constructor(args: params) {
    super('checkbox', args);
  }
}
class DateConfigurator extends FieldConfigurator<'date', InputProps<'date'>> {
  constructor(args: params) {
    super('date', args);
  }

  min(value: string) {
    this.props.attributes.min = value;
    return this;
  }
  max(value: string) {
    this.props.attributes.max = value;
    return this;
  }
  step(value: string) {
    this.props.attributes.step = value;
    return this;
  }
}
class EmailConfigurator extends FieldConfigurator<'email', InputProps<'email'>> {
  constructor(args: params) {
    super('email', args);
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
class FileConfigurator extends FieldConfigurator<'file', InputProps<'file'>> {
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

  multiple(value: boolean) {
    this.props.attributes.multiple = value;
    return this;
  }
}
class NumberConfigurator extends FieldConfigurator<'number', InputProps<'number'>> {
  constructor(args: params) {
    super('number', args);
  }

  min(value: string) {
    this.props.attributes.min = value;
    return this;
  }
  max(value: string) {
    this.props.attributes.max = value;
    return this;
  }
  step(value: string) {
    this.props.attributes.step = value;
    return this;
  }
}
class PasswordConfigurator extends FieldConfigurator<'password', InputProps<'password'>> {
  constructor(args: params) {
    super('password', args);
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
class RadioConfigurator extends FieldConfigurator<'radio', RadioProps> {
  constructor(args: params) {
    super('radio', args);
  }
}
class SelectConfigurator extends FieldConfigurator<'select', SelectProps> {
  constructor(args: params) {
    super('select', args);
  }

  data(data: []) {
    this.props.data = data;
    return this;
  }

  multiple(value: boolean) {
    this.props.attributes.multiple = value;
    return this;
  }
}
class TimeConfigurator extends FieldConfigurator<'time', InputProps<'time'>> {
  constructor(args: params) {
    super('time', args);
  }

  min(value: string) {
    this.props.attributes.min = value;
    return this;
  }
  max(value: string) {
    this.props.attributes.max = value;
    return this;
  }
  step(value: string) {
    this.props.attributes.step = value;
    return this;
  }
}
class TelConfigurator extends FieldConfigurator<'tel', InputProps<'tel'>> {
  constructor(args: params) {
    super('tel', args);
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
class TextConfigurator extends FieldConfigurator<'text', InputProps<'text'>> {
  constructor(args: params) {
    super('text', args);
  }
}
class TextareaConfigurator extends FieldConfigurator<'textarea', TextareaProps> {
  constructor(args: params) {
    super('textarea', args);
  }

  autosize(value: boolean) {
    this.props.autosize = value;
    return this;
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

export const field = {
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

abstract class ActionConfigurator<K> {
  props: K;

  constructor(props: K) {
    this.props = props;
  }

  get $(): K {
    return { ...this.props };
  }
}

class ButtonConfigurator {
  constructor() {}
}

export const action = {
  button: () => new ButtonConfigurator(),
};
