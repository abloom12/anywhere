import { Component } from '@/components/ComponentBase';
import { TextareaFieldProps } from './_types';

class Textarea extends Component {
  #props: TextareaFieldProps;

  constructor(props: TextareaFieldProps) {
    super();

    this.#props = { ...props };

    this.render();
  }

  render() {
    const field: HTMLDivElement = document.createElement('div');

    const textarea: HTMLTextAreaElement = document.createElement('textarea');
    textarea.name = this.#props.name;
    textarea.id = this.#props.id;

    const label: HTMLLabelElement = document.createElement('label');
    label.textContent = this.#props.label;
    label.htmlFor = this.#props.id;

    field.appendChild(label);
    field.appendChild(textarea);

    this.rootElement.appendChild(field);
  }
}

export { Textarea };
