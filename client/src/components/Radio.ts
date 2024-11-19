import { Component } from '@/core/component';

export type Props = {
  id: string;
  name: string;
  attributes: Partial<Pick<HTMLInputElement, 'disabled' | 'required'>>;
};

class Radio extends Component {
  #props: Props;

  constructor(props: Props) {
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

    field.appendChild(input);

    this.rootElement.appendChild(field);
  }
}

export { Radio };
