import { Component } from '@/components/ComponentBase';
import { FieldProps, InputType as DirtyType } from './_types';

type InputType = Exclude<DirtyType, 'checkbox' | 'radio' | 'select' | 'textarea'>;

class Input<T extends InputType> extends Component {
  #props: FieldProps<T>;

  constructor(props: FieldProps<T>) {
    super();

    this.#props = { ...props };

    this.render();
  }

  protected render() {
    const field: HTMLDivElement = document.createElement('div');

    const input: HTMLInputElement = document.createElement('input');
    input.type = this.#props.type;
    input.name = this.#props.name;
    input.id = this.#props.id;

    const label: HTMLLabelElement = document.createElement('label');
    label.textContent = this.#props.label;
    label.htmlFor = this.#props.id;

    field.appendChild(label);
    field.appendChild(input);

    this.rootElement.appendChild(field);
  }
}

export { Input };
