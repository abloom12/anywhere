import { Component } from '@/core/Component';
import { html } from '@/core/html';
import { cn } from '@/core/cn';

type Props = {
  text: string;
  for?: string; //TODO: make this required
};

export class Label extends Component {
  #props: Props;

  constructor(props: Props) {
    super();

    this.#props = {
      ...props,
    };

    this.render();
  }

  protected render() {
    const label = html`
      <label
        for="${this.#props.for}"
        class="text-sm capitalize"
        >${this.#props.text}</label
      >
    `;

    this.rootElement.appendChild(label);
  }
}
