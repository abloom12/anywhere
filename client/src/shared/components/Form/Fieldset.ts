import { Component } from '@/core/Component';
import { cn } from '@/shared/util/cn';
import { html, withRefs } from '@/shared/util/html';

type Props = {
  legend: string;
};

export class Fieldset extends Component {
  #props: Props;
  #fieldset: HTMLElement | null;

  constructor(props: Props) {
    super();

    this.#props = {
      ...props,
    };

    this.#fieldset = null;
  }

  append(element: DocumentFragment | HTMLElement) {
    this.#fieldset?.append(element);
  }

  render() {
    const { ele, refs } = withRefs(html`
      <fieldset ref="fieldset">
        <legend>${this.#props.legend}</legend>
      </fieldset>
    `);

    this.#fieldset = refs.fieldset;

    return ele;
  }
}
