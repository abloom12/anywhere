import { Component } from '@/core/component';

export type Props = {
  id: string;
  name: string;
  label: string;
  attributes: Partial<Pick<HTMLSelectElement, 'disabled' | 'multiple' | 'required'>>;
  data?: [];
};

class Select extends Component {
  #props: Props;

  constructor(props: Props) {
    super();

    this.#props = { ...props };

    this.render();
  }

  render() {
    const field: HTMLDivElement = document.createElement('div');

    const select: HTMLSelectElement = document.createElement('select');
    select.name = this.#props.name;
    select.id = this.#props.id;

    const label: HTMLLabelElement = document.createElement('label');
    label.textContent = this.#props.label;
    label.htmlFor = this.#props.id;

    field.appendChild(label);
    field.appendChild(select);

    this.rootElement.appendChild(field);
  }

  populate(data: []) {}
  setValue(value: string) {}
}

export { Select };
