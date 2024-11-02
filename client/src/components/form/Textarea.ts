import { cva, type VariantProps } from 'class-variance-authority';
import { Component } from '@/components/ComponentBase';

const textAreaVariants = cva([], {
  variants: {},
  compoundVariants: [],
  defaultVariants: {},
});

type Props = VariantProps<typeof textAreaVariants> & {};

class Textarea extends Component {
  #props: Props;

  constructor(props: Props) {
    super();

    this.#props = { ...props };
  }

  render() {
    const textarea: HTMLTextAreaElement = document.createElement('textarea');
    const label: HTMLLabelElement = document.createElement('label');

    // this.rootElement.appendChild();
  }
}

export { Textarea };
