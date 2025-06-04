import { type VariantProps } from 'class-variance-authority';
import { uniqueId } from '@/shared/util/unique-id';
import { type Props as InputProps, InputType } from '@/shared/components/Input';
import { type Props as CheckboxProps } from '@/shared/components/Checkbox';
import { type Props as RadioProps } from '@/shared/components/Radio';
import { type Props as SelectProps } from '@/shared/components/Select';
import { type Props as TextareaProps } from '@/shared/components/Textarea';
import { type Props as ButtonProps, buttonVariants } from '@/shared/components/Button';

type FieldType = InputType | 'checkbox' | 'radio' | 'select' | 'textarea';

type _CheckboxProps<N extends string> = Omit<CheckboxProps, 'name'> & { name: N };
type _RadioProps<N extends string> = Omit<RadioProps, 'name'> & { name: N };
type _SelectProps<N extends string> = Omit<SelectProps, 'name'> & { name: N };
type _TextareaProps<N extends string> = Omit<TextareaProps, 'name'> & { name: N };
type _InputProps<T extends InputType, N extends string> = Omit<InputProps<T>, 'name'> & {
  name: N;
};

type BaseProps<T extends FieldType, N extends string> =
  T extends 'checkbox' ? _CheckboxProps<N> & { type: 'checkbox' }
  : T extends 'radio' ? _RadioProps<N> & { type: 'radio' }
  : T extends 'select' ? _SelectProps<N> & { type: 'select' }
  : T extends 'textarea' ? _TextareaProps<N> & { type: 'textarea' }
  : T extends InputType ? _InputProps<T, N>
  : never;

abstract class FieldConfigurator<T extends FieldType, N extends string> {
  props: BaseProps<T, N>;
  label: string;

  constructor(type: T, name: N, label: string) {
    this.props = {
      type,
      id: uniqueId(),
      name,
      attributes: {},
    } as BaseProps<T, N>;

    this.label = label;
  }

  get $(): BaseProps<T, N> & { label: string } {
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

class CheckboxConfigurator<N extends string> extends FieldConfigurator<'checkbox', N> {
  constructor(name: N, label: string) {
    super('checkbox', name, label);
  }
}
class DateConfigurator<N extends string> extends FieldConfigurator<'date', N> {
  constructor(name: N, label: string) {
    super('date', name, label);
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
class EmailConfigurator<N extends string> extends FieldConfigurator<'email', N> {
  constructor(name: N, label: string) {
    super('email', name, label);
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
class FileConfigurator<N extends string> extends FieldConfigurator<'file', N> {
  constructor(name: N, label: string) {
    super('file', name, label);
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
class NumberConfigurator<N extends string> extends FieldConfigurator<'number', N> {
  constructor(name: N, label: string) {
    super('number', name, label);
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
class PasswordConfigurator<N extends string> extends FieldConfigurator<'password', N> {
  constructor(name: N, label: string) {
    super('password', name, label);
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
class RadioConfigurator<N extends string> extends FieldConfigurator<'radio', N> {
  constructor(name: N, label: string) {
    super('radio', name, label);
  }
}
class SelectConfigurator<N extends string> extends FieldConfigurator<'select', N> {
  constructor(name: N, label: string) {
    super('select', name, label);
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
class TimeConfigurator<N extends string> extends FieldConfigurator<'time', N> {
  constructor(name: N, label: string) {
    super('time', name, label);
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
class TelConfigurator<N extends string> extends FieldConfigurator<'tel', N> {
  constructor(name: N, label: string) {
    super('tel', name, label);
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
class TextConfigurator<N extends string> extends FieldConfigurator<'text', N> {
  constructor(name: N, label: string) {
    super('text', name, label);
  }
}
class TextareaConfigurator<N extends string> extends FieldConfigurator<'textarea', N> {
  constructor(name: N, label: string) {
    super('textarea', name, label);
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
  checkbox: <N extends string>(name: N, label: string) =>
    new CheckboxConfigurator<N>(name, label),
  date: <N extends string>(name: N, label: string) =>
    new DateConfigurator<N>(name, label),
  email: <N extends string>(name: N, label: string) =>
    new EmailConfigurator<N>(name, label),
  file: <N extends string>(name: N, label: string) =>
    new FileConfigurator<N>(name, label),
  number: <N extends string>(name: N, label: string) =>
    new NumberConfigurator<N>(name, label),
  password: <N extends string>(name: N, label: string) =>
    new PasswordConfigurator<N>(name, label),
  radio: <N extends string>(name: N, label: string) =>
    new RadioConfigurator<N>(name, label),
  select: <N extends string>(name: N, label: string) =>
    new SelectConfigurator<N>(name, label),
  time: <N extends string>(name: N, label: string) =>
    new TimeConfigurator<N>(name, label),
  tel: <N extends string>(name: N, label: string) => new TelConfigurator<N>(name, label),
  text: <N extends string>(name: N, label: string) =>
    new TextConfigurator<N>(name, label),
  textarea: <N extends string>(name: N, label: string) =>
    new TextareaConfigurator<N>(name, label),
};

class ButtonConfigurator {
  props: ButtonProps;

  constructor([text]: [text: string]) {
    this.props = {
      text,
      type: 'button',
    };
  }

  get $(): ButtonProps {
    return { ...this.props };
  }

  type(value: 'submit' | 'button') {
    this.props.type = value;
    return this;
  }
  style(value: VariantProps<typeof buttonVariants>['style']) {
    this.props.style = value;
    return this;
  }
  intent(value: VariantProps<typeof buttonVariants>['intent']) {
    this.props.intent = value;
    return this;
  }
  icon(value: any) {
    this.props.icon = value;
    return this;
  }
}

export const action = {
  button: (...args: [text: string]) => new ButtonConfigurator(args),
};
