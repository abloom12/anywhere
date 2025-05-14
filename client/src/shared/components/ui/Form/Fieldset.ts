import { Component } from '@/core/Component';
import { html } from '@/shared/util/html';
import { cn } from '@/shared/util/cn';

type Props = {
  legend: string;
};

export class Fieldset extends Component {
  #props: Props;

  constructor(props: Props) {
    super();

    this.#props = {
      ...props,
    };
  }

  render() {
    return html`
      <fieldset>
        <legend>${this.#props.legend}</legend>
      </fieldset>
    `;
  }
}
