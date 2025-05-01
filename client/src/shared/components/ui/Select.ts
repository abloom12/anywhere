import { Component } from '@/core/Component';
import { html } from '@/core/html';
import { cn } from '@/core/cn';

export type Props = {
  id: string;
  name: string;
  attributes: Partial<Pick<HTMLSelectElement, 'disabled' | 'multiple' | 'required'>>;
  data?: [];
};

export class Select extends Component {
  #props: Props;

  constructor(props: Props) {
    super();

    this.#props = { ...props };

    this.render();
  }

  protected render() {
    const select = html`
      <select
        name="${this.#props.name}"
        id="${this.#props.id}"
        class="invalid:border-erro"
      ></select>
    `;

    this.rootElement.appendChild(select);
  }

  populate(data: []) {}
  setValue(value: string) {}
}
