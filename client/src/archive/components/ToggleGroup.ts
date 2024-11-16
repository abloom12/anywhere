import { cva, type VariantProps } from 'class-variance-authority';
import { Component } from '@/components/ComponentBase';

const toggleGroupVariants = cva([], {
  variants: {},
  compoundVariants: [],
  defaultVariants: {},
});

type Props = VariantProps<typeof toggleGroupVariants> & {};

class ToggleGroup extends Component {
  #props: Props;

  constructor(props: Props) {
    super();

    this.#props = { ...props };
  }

  render() {
    const toggleGroup: HTMLDivElement = document.createElement('div');

    this.rootElement.appendChild(toggleGroup);
  }
}

export { ToggleGroup };
