import { Component } from '@/lib/component';

type Props = {
  text: string;
};

class Link extends Component {
  #props: Props;
  #element: HTMLAnchorElement = document.createElement('a');

  constructor(props: Props) {
    super();

    this.#props = { ...props };
  }

  render() {
    this.#element.textContent = this.#props.text;
  }
}

export { Link };
