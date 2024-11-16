import { cva, type VariantProps } from 'class-variance-authority';
import { Component } from '@/core/component';

const buttonVariants = cva(
  [
    'font-medium',
    'text-sm',
    'uppercase',
    'inline-flex',
    'items-center',
    'justify-center',
    'text-nowrap',
    'whitespace-nowrap',
    'disabled:pointer-events-none',
    'disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        contained: ['bg-primary', 'rounded', 'text-black'],
        ghost: ['rounded', 'border-2', 'border-primary', 'border-solid'],
        text: 'text-black',
      },
      size: {
        small: ['h-9', 'px-2'],
        medium: ['h-10', 'px-3'],
        large: ['h-11', 'px-8'],
        icon: ['h-10', 'w-10'],
      },
    },
    defaultVariants: {
      variant: 'contained',
      size: 'medium',
    },
  },
);

type Props = VariantProps<typeof buttonVariants> & {
  text: string;
  type?: 'submit' | 'button';
  icon?: string;
};

class Button extends Component {
  #props: Props;

  constructor(props: Props) {
    super();

    this.#props = {
      type: 'button',
      size: 'medium',
      variant: 'contained',
      ...props,
    };

    this.render();
  }

  render() {
    const button: HTMLButtonElement = document.createElement('button');
    button.textContent = this.#props.text;

    button.className = 'text-black';
    button.className = buttonVariants({
      variant: this.#props.variant,
      size: this.#props.size,
    });

    this.rootElement.appendChild(button);
  }
}

export { Button };
