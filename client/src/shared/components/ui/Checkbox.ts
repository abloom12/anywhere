import { Component } from '@/core/Component';
import { html } from '@/shared/util/html';
import { cn } from '@/shared/util/cn';

export type Props = {
  id: string;
  name: string;
  attributes: Partial<
    Pick<HTMLInputElement, 'disabled' | 'required'>
  >;
};

export class Checkbox extends Component {
  #props: Props;

  constructor(props: Props) {
    super();

    this.#props = { ...props };
  }

  render() {
    return html`
      <input
        type="checkbox"
        name="${this.#props.name}"
        id="${this.#props.id}"
        class="text-black invalid:border-error"
      />
    `;
  }
}
