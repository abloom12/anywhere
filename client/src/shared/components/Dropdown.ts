import { cva, type VariantProps } from 'class-variance-authority';
import { Component } from '@/core/component';

const dropdownVariants = cva([], {
  variants: {},
  compoundVariants: [],
  defaultVariants: {},
});

type Props = VariantProps<typeof dropdownVariants> & {
  trigger: string; //? or call it text
  items: [];
};

class Dropdown extends Component {
  #props: Props;

  constructor(props: Props) {
    super();

    this.#props = { ...props };
  }

  render() {
    const dropdown: HTMLDialogElement = document.createElement('dialog');

    this.rootElement.appendChild(dropdown);
  }
}

export { Dropdown };
