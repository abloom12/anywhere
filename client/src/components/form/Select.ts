import { cva, type VariantProps } from 'class-variance-authority';
import { Component } from '@/components/ComponentBase';

const selectVariants = cva([], {
  variants: {},
  compoundVariants: [],
  defaultVariants: {},
});

type Props = VariantProps<typeof selectVariants> & {};

class Select extends Component {
  #props: Props;

  constructor(props: Props) {
    super();

    this.#props = { ...props };
  }

  render() {
    const select: HTMLSelectElement = document.createElement('select');
    const label: HTMLLabelElement = document.createElement('label');

    // this.rootElement.appendChild();
  }
}

export { Select };
