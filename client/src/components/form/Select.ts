import { Component } from '@/components/ComponentBase';
import { FieldProps } from './_types';
import { uniqueId } from '@/util/uniqueId';

class Select extends Component {
  #props: FieldProps<'select'>;
  #id: string;

  constructor(props: FieldProps<'select'>) {
    super();

    this.#props = { ...props };
    this.#id = uniqueId();

    this.render();
  }

  render() {
    const field: HTMLDivElement = document.createElement('div');

    const select: HTMLSelectElement = document.createElement('select');
    select.name = this.#props.name;
    select.id = this.#id;

    const label: HTMLLabelElement = document.createElement('label');
    label.textContent = this.#props.label;
    label.htmlFor = this.#id;

    field.appendChild(label);
    field.appendChild(select);

    this.rootElement.appendChild(field);
  }

  populate(data: []) {}
  setValue(value: string) {}
}

export { Select };
