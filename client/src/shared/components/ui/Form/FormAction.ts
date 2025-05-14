import { Component } from '@/core/Component';
import { html } from '@/shared/util/html';

import { Button, Props as ButtonProps } from '@/shared/components/ui/Button';

export type ActionProps = {} & ButtonProps & { type: 'button' };

export class FormAction extends Component {
  #props: ActionProps;

  constructor(props: ActionProps) {
    super();

    this.#props = {
      ...props,
    };
  }

  render() {
    return html``;
  }
}
