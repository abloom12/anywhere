import { Component } from '@/lib/core/component';

type Props = {
  text: string;
};

class Link extends Component {
  #props: Props;

  constructor(props: Props) {
    super();

    this.#props = { ...props };
  }

  onClick(e: MouseEvent) {}
  onKeyDown(e: KeyboardEvent) {}

  render() {
    const link: HTMLAnchorElement = document.createElement('a');
    link.textContent = this.#props.text;
  }
}

export { Link };
