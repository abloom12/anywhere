import { cva, type VariantProps } from 'class-variance-authority';
import { Component } from '@/core/Component';
import { html } from '@/shared/util/html';
import { cn } from '@/shared/util/cn';

const avatarVariants = cva(
  ['inline-block', 'overflow-hidden', 'bg-gray-200'],
  {
    variants: {
      size: {
        sm: ['w-6', 'h-6'],
        md: ['w-8', 'h-8'],
        lg: ['w-12', 'h-12'],
        xl: ['w-16', 'h-16'],
      },
      shape: {
        circle: ['rounded-full'],
        square: ['rounded'],
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'circle',
    },
  },
);

type Props = VariantProps<typeof avatarVariants> & {
  src: string;
  alt?: string;
};

export class Avatar extends Component {
  #props: Props;

  constructor(props: Props) {
    super();
    this.#props = props;
  }

  render() {
    return html`
      <img
        src="${this.#props.src}"
        alt="${this.#props.alt ?? ''}"
        class="${cn(
          avatarVariants({
            size: this.#props.size,
            shape: this.#props.shape,
          }),
        )}"
      />
    `;
  }
}
