import { Component } from '@/core/Component';
import { html } from '@/shared/util/html';
import { cn } from '@/shared/util/cn';

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
  }

  render() {
    return html`
      <label
        for="${this.#props.for}"
        class="text-sm capitalize"
        >${this.#props.text}</label
      >
    `;
  }
}
