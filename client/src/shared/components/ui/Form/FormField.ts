import { Component } from '@/core/Component';
import { cn } from '@/shared/util/cn';
import { html, withRefs } from '@/shared/util/html';

import { Input, Props as InputProps, InputType } from '@/shared/components/ui/Input';
import { Checkbox, Props as CheckboxProps } from '@/shared/components/ui/Checkbox';
import { Radio, Props as RadioProps } from '@/shared/components/ui/Radio';
import { Select, Props as SelectProps } from '@/shared/components/ui/Select';
import { Textarea, Props as TextareaProps } from '@/shared/components/ui/Textarea';
import { Label } from '@/shared/components/ui/Label';

export type FieldProps = {
  label: string;
} & (
  | (CheckboxProps & { type: 'checkbox' })
  | (RadioProps & { type: 'radio' })
  | (SelectProps & { type: 'select' })
  | (TextareaProps & { type: 'textarea' })
  | InputProps<'date'>
  | InputProps<'email'>
  | InputProps<'file'>
  | InputProps<'number'>
  | InputProps<'password'>
  | InputProps<'tel'>
  | InputProps<'text'>
  | InputProps<'time'>
);

export class FormField extends Component {
  #props: FieldProps;
  #field: Component;
  #label: Component;

  constructor(props: FieldProps) {
    super();

    this.#props = {
      ...props,
    };

    this.#label = new Label({ text: this.#props.label });

    const { type, label, ...rest }: FieldProps = this.#props;

    switch (this.#props.type) {
      case 'checkbox':
        this.#field = new Checkbox(rest);
        break;
      case 'radio':
        this.#field = new Radio(rest);
        break;
      case 'select':
        this.#field = new Select(rest);
        break;
      case 'textarea':
        this.#field = new Textarea(rest);
        break;
      default:
        this.#field = new Input({ ...rest, type: this.#props.type });
    }
  }

  append() {}

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
