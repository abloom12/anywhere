import { cva, type VariantProps } from 'class-variance-authority';
import { Component } from '@/components/ComponentBase';

const badgeVariants = cva(['text-xs', 'inline-flex', 'items-center', 'justify-center'], {
  variants: {},
  compoundVariants: [],
  defaultVariants: {},
});

type Props = VariantProps<typeof badgeVariants> & {};

class Badge extends Component {
  #props: Props;

  constructor(props: Props) {
    super();

    this.#props = { ...props };
  }

  render() {
    const badge: HTMLDivElement = document.createElement('div');

    this.rootElement.appendChild(badge);
  }
}

export { Badge };
