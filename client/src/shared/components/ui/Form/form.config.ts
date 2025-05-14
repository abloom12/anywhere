import { uniqueId } from '@/shared/util/unique-id';
import { Props as InputProps, InputType } from '@/shared/components/ui/Input';
import { Props as CheckboxProps } from '@/shared/components/ui/Checkbox';
import { Props as RadioProps } from '@/shared/components/ui/Radio';
import { Props as SelectProps } from '@/shared/components/ui/Select';
import { Props as TextareaProps } from '@/shared/components/ui/Textarea';
import {
  Props as ButtonProps,
  StyleType,
  IntentType,
} from '@/shared/components/ui/Button';

type FieldType = InputType | 'checkbox' | 'radio' | 'select' | 'textarea';

type fieldParams = [name: string, label: string];

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

  constructor(type: T, [name, label]: fieldParams) {
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
  constructor(args: fieldParams) {
    super('checkbox', args);
  }
}
class DateConfigurator extends FieldConfigurator<'date', InputProps<'date'>> {
  constructor(args: fieldParams) {
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
  constructor(args: fieldParams) {
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
  constructor(args: fieldParams) {
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
  constructor(args: fieldParams) {
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
  constructor(args: fieldParams) {
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
  constructor(args: fieldParams) {
    super('radio', args);
  }
}
class SelectConfigurator extends FieldConfigurator<'select', SelectProps> {
  constructor(args: fieldParams) {
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
  constructor(args: fieldParams) {
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
  constructor(args: fieldParams) {
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
  constructor(args: fieldParams) {
    super('text', args);
  }
}
class TextareaConfigurator extends FieldConfigurator<'textarea', TextareaProps> {
  constructor(args: fieldParams) {
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
  checkbox: (...args: fieldParams) => new CheckboxConfigurator(args),
  date: (...args: fieldParams) => new DateConfigurator(args),
  email: (...args: fieldParams) => new EmailConfigurator(args),
  file: (...args: fieldParams) => new FileConfigurator(args),
  number: (...args: fieldParams) => new NumberConfigurator(args),
  password: (...args: fieldParams) => new PasswordConfigurator(args),
  radio: (...args: fieldParams) => new RadioConfigurator(args),
  select: (...args: fieldParams) => new SelectConfigurator(args),
  time: (...args: fieldParams) => new TimeConfigurator(args),
  tel: (...args: fieldParams) => new TelConfigurator(args),
  text: (...args: fieldParams) => new TextConfigurator(args),
  textarea: (...args: fieldParams) => new TextareaConfigurator(args),
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
  style(value: StyleType) {
    this.props.style = value;
    return this;
  }
  intent(value: IntentType) {
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
