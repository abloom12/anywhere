import { Component } from '@/core/component';
import { html } from '@/core/html';
import { cn } from '@/core/cn';

export type Props = {
  id: string;
  name: string;
  attributes: Partial<Pick<HTMLInputElement, 'disabled' | 'required'>>;
};

export class Radio extends Component {
  #props: Props;

  constructor(props: Props) {
    super();

    this.#props = { ...props };

    this.render();
  }

  protected render() {
    const input = html`
      <input
        type="radio"
        name="${this.#props.name}"
        id="${this.#props.id}"
        class="invalid:border-error text-black"
      />
    `;

    this.rootElement.appendChild(input);
  }
}
