import { Component } from '@/core/Component';
import { cn } from '@/shared/util/cn';
import { html } from '@/core/html';

import {
  Input,
  type Props as InputProps,
  type InputType,
} from '@/shared/components/Input';
import { Checkbox, type Props as CheckboxProps } from '@/shared/components/Checkbox';
import { Radio, type Props as RadioProps } from '@/shared/components/Radio';
import { Select, type Props as SelectProps } from '@/shared/components/Select';
import { Textarea, type Props as TextareaProps } from '@/shared/components/Textarea';
import { Label } from '@/shared/components/Label';

type FieldMap = {
  checkbox: CheckboxProps & { type: 'checkbox' };
  radio: RadioProps & { type: 'radio' };
  select: SelectProps & { type: 'select' };
  textarea: TextareaProps & { type: 'textarea' };
  date: InputProps<'date'>;
  email: InputProps<'email'>;
  file: InputProps<'file'>;
  number: InputProps<'number'>;
  password: InputProps<'password'>;
  tel: InputProps<'tel'>;
  text: InputProps<'text'>;
  time: InputProps<'time'>;
};
export type FieldTypes = keyof FieldMap;
export type FieldProps<T extends FieldTypes> = {
  label: string;
} & FieldMap[T];

export class FormField<T extends FieldTypes> extends Component {
  #props: FieldProps<T>;
  #field: Component;
  #label: Label;

  constructor(props: FieldProps<T>) {
    super();

    this.#props = props;

    this.#label = new Label({ text: this.#props.label });

    const { type, label, ...rest } = this.#props;

    switch (this.#props.type) {
      case 'checkbox':
        this.#field = new Checkbox(rest as CheckboxProps);
        break;
      case 'radio':
        this.#field = new Radio(rest as RadioProps);
        break;
      case 'select':
        this.#field = new Select(rest as SelectProps);
        break;
      case 'textarea':
        this.#field = new Textarea(rest as TextareaProps);
        break;
      default:
        this.#field = new Input({ ...rest, type: this.#props.type });
    }
  }

  render() {
    return html`
      <div
        class="test"
        ref="testRef"
      >
        ${this.#label.render()} ${this.#field.render()}
      </div>
    `;
  }
}
