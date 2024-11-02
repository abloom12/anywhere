import { cva, type VariantProps } from 'class-variance-authority';
import { Component } from '@/components/ComponentBase';

const checkboxVariants = cva([], {
  variants: {},
  compoundVariants: [],
  defaultVariants: {},
});

type Props = VariantProps<typeof checkboxVariants> & {};

class Checkbox extends Component {
  #props: Props;

  constructor(props: Props) {
    super();

    this.#props = { ...props };
  }

  render() {
    const input: HTMLInputElement = document.createElement('input');
    const label: HTMLLabelElement = document.createElement('label');

    // this.rootElement.appendChild();
  }
}

export { Checkbox };
