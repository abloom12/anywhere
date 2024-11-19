import { cva, type VariantProps } from 'class-variance-authority';
import { Component } from '@/core/component';

const toggleVariants = cva([], {
  variants: {},
  compoundVariants: [],
  defaultVariants: {},
});

type Props = VariantProps<typeof toggleVariants> & {};

class Toggle extends Component {
  #props: Props;

  constructor(props: Props) {
    super();

    this.#props = { ...props };
  }

  render() {
    const toggle: HTMLDivElement = document.createElement('div');

    this.rootElement.appendChild(toggle);
  }
}

export { Toggle };
