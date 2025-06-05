import { Component } from '@/core/Component';
import { html } from '@/core/html';
import { cn } from '@/shared/util/cn';

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
  }

  render() {
    return html`
      <textarea
        name="${this.#props.name}"
        id="${this.#props.id}"
        class="text-black invalid:border-error"
      ></textarea>
    `;
  }
}
