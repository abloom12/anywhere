import { cva, type VariantProps } from 'class-variance-authority';
import { Component } from '@/components/ComponentBase';

const AvatarVariants = cva([], {
  variants: {},
  compoundVariants: [],
  defaultVariants: {},
});

type Props = VariantProps<typeof AvatarVariants> & {};

class Avatar extends Component {
  #props: Props;

  constructor(props: Props) {
    super();

    this.#props = { ...props };
  }

  render() {
    const avatar: HTMLDivElement = document.createElement('div');

    this.rootElement.appendChild(avatar);
  }
}

export { Avatar };
