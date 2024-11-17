import { Component } from '@/core/component';

export type Props = {
  id: string;
  name: string;
  label: string;
  attributes: Partial<
    Pick<
      HTMLTextAreaElement,
      'disabled' | 'maxLength' | 'minLength' | 'readOnly' | 'required'
    >
  >;
  autosize?: boolean;
};

class Textarea extends Component {
  #props: Props;

  constructor(props: Props) {
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
