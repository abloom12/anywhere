import { Component } from '@/core/component';
import { html } from '@/core/html';
import { cn } from '@/core/cn';

export type Props = {
  id: string;
  name: string;
  attributes: Partial<
    Pick<
      HTMLTextAreaElement,
      'disabled' | 'maxLength' | 'minLength' | 'readOnly' | 'required'
    >
  >;
  autosize?: boolean;
};

export class Textarea extends Component {
  #props: Props;

  constructor(props: Props) {
    super();

    this.#props = { ...props };

    this.render();
  }

  protected render() {
    const textarea = html`
      <textarea
        name="${this.#props.name}"
        id="${this.#props.id}"
        class="invalid:border-error text-black"
      ></textarea>
    `;

    this.rootElement.appendChild(textarea);
  }
}
