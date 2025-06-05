import { Component } from '@/core/Component';
import { html } from '@/core/html';
import { cn } from '@/shared/util/cn';

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
  }

  render() {
    return html`
      <select
        name="${this.#props.name}"
        id="${this.#props.id}"
        class="invalid:border-erro"
      ></select>
    `;
  }

  populate(data: []) {}
  setValue(value: string) {}
}
