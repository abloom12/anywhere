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
  #Field: Component;
  #FieldLabel: Component;

  constructor(props: FieldProps) {
    super();

    this.#props = {
      ...props,
    };

    this.#FieldLabel = new Label({ text: this.#props.label });

    const { type, label, ...rest }: FieldProps = this.#props;
    switch (this.#props.type) {
      case 'checkbox':
        this.#Field = new Checkbox(rest);
        break;
      case 'radio':
        this.#Field = new Radio(rest);
        break;
      case 'select':
        this.#Field = new Select(rest);
        break;
      case 'textarea':
        this.#Field = new Textarea(rest);
        break;
      default:
        this.#Field = new Input({ ...rest, type: this.#props.type });
    }

    this.render();
  }

  append() {}

  render() {
    const { ele, refs } = withRefs(html`
      <div
        class="test"
        ref="testRef"
      >
        ${this.#FieldLabel.render()} ${this.#Field.render()}
      </div>
    `);
    console.log(refs.testRef);

    return ele;
  }
}
