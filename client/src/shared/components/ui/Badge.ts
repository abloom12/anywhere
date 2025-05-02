import { cva, type VariantProps } from 'class-variance-authority';
import { Component } from '@/core/Component';
import { html } from '@/core/html';
import { cn } from '@/core/cn';

const badgeVariants = cva(
  ['inline-flex', 'items-center', 'justify-center', 'font-medium', 'rounded-full'],
  {
    variants: {
      variant: {
        default: ['bg-gray-200', 'text-gray-800'],
        success: ['bg-green-200', 'text-green-800'],
        warning: ['bg-yellow-200', 'text-yellow-800'],
        danger: ['bg-red-200', 'text-red-800'],
      },
      size: {
        sm: ['px-2', 'py-0.5', 'text-xs'],
        md: ['px-3', 'py-1', 'text-sm'],
        lg: ['px-4', 'py-1.5', 'text-base'],
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

type Props = VariantProps<typeof badgeVariants> & {
  text: string;
};

export class Badge extends Component {
  #props: Props;

  constructor(props: Props) {
    super();
    this.#props = props;
    this.render();
  }

  protected render() {
    const span = html`
      <span
        class="${cn(
          badgeVariants({
            variant: this.#props.variant,
            size: this.#props.size,
          }),
        )}"
      >
        ${this.#props.text}
      </span>
    `;
    this.rootElement.appendChild(span);
  }
}
