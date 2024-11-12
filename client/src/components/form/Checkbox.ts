import { Component } from '@/components/ComponentBase';
import { FieldProps } from './_types';
import { uniqueId } from '@/util/uniqueId';

type classname = string;

class Checkbox extends Component {
  #props: FieldProps<'checkbox'>;
  #id: string;

  constructor(props: FieldProps<'checkbox'>) {
    super();

    this.#props = { ...props };
    this.#id = uniqueId();

    this.render();
  }

  render() {
    const field: HTMLDivElement = document.createElement('div');
    const fieldStyle: classname = '';
    field.className = fieldStyle;

    const input: HTMLInputElement = document.createElement('input');
    input.type = 'checkbox';
    input.name = this.#props.name;
    input.id = this.#id;

    const label: HTMLLabelElement = document.createElement('label');
    label.textContent = this.#props.label;
    label.htmlFor = this.#id;

    field.appendChild(label);
    field.appendChild(input);

    this.rootElement.appendChild(field);
  }
}

export { Checkbox };
