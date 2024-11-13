import { Component } from '@/components/ComponentBase';
import { FieldProps } from './_types';

class Radio extends Component {
  #props: FieldProps<'radio'>;

  constructor(props: FieldProps<'radio'>) {
    super();

    this.#props = { ...props };

    this.render();
  }

  render() {
    const field: HTMLDivElement = document.createElement('div');

    const input: HTMLInputElement = document.createElement('input');
    input.type = 'radio';
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

export { Radio };
