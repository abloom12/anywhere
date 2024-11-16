import { Component } from '@/core/component';
import { FieldProps } from './_types';

class Checkbox extends Component {
  #props: FieldProps<'checkbox'>;

  constructor(props: FieldProps<'checkbox'>) {
    super();

    this.#props = { ...props };

    this.render();
  }

  render() {
    const field: HTMLDivElement = document.createElement('div');

    const input: HTMLInputElement = document.createElement('input');
    input.type = 'checkbox';
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

export { Checkbox };
