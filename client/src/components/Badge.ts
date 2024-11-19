import { cva, type VariantProps } from 'class-variance-authority';
import { Component } from '@/core/component';

const badgeVariants = cva(['text-xs', 'inline-flex', 'items-center', 'justify-center'], {
  variants: {},
  compoundVariants: [],
  defaultVariants: {},
});

type Props = VariantProps<typeof badgeVariants> & {};

export class Badge extends Component {
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
