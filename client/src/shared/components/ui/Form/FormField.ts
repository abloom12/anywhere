import { Component } from '@/core/Component';
import { html } from '@/core/html';
import { cn } from '@/core/cn';

import { Input, Props as InputProps } from '@/shared/components/ui/Input';
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
  #Field: Component;
  #FieldLabel: Component;

  constructor(props: FieldProps) {
    super();
    this.#props = {
      ...props,
    };

    this.#FieldLabel = new Label({ text: this.#props.label });

    switch (props.type) {
      case 'checkbox':
        this.#Field = new Checkbox(props);
        break;
      case 'radio':
        this.#Field = new Radio(props);
        break;
      case 'select':
        this.#Field = new Select(props);
        break;
      case 'textarea':
        this.#Field = new Textarea(props);
        break;
      default:
        this.#Field = new Input(props);
    }

    this.render();
  }

  render() {
    const formfield = html`
      <div class="">${this.#FieldLabel.element} ${this.#Field.element}</div>
    `;

    this.rootElement.appendChild(formfield);
  }
}
