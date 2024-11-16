import { cva, type VariantProps } from 'class-variance-authority';
import { Component } from '@/components/ComponentBase';

const linkVariants = cva([], {
  variants: {},
  compoundVariants: [],
  defaultVariants: {},
});

type Props = VariantProps<typeof linkVariants> & {
  text: string;
  href: string;
};

class Link extends Component {
  #props: Props;

  constructor(props: Props) {
    super();

    this.#props = { ...props };
  }

  render() {
    const link: HTMLAnchorElement = document.createElement('a');

    link.textContent = this.#props.text;
    link.href = this.#props.href;

    this.rootElement.appendChild(link);
  }
}

export { Link };
