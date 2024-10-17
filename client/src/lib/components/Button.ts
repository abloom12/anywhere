import { cva, type VariantProps } from 'class-variance-authority';
import { Component } from '@/lib/core/component';

type Props = {
  text: string;
  type?: 'submit' | 'button';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'contained' | 'ghost' | 'text';
  icon?: string;
};

const buttonVariants = cva(
  ['disabled:pointer-events-none', 'disabled:opacity-50'],
  {
    variants: {
      variant: {
        contained: '',
        ghost: '',
        text: '',
      },
      size: {
        sm: '',
        md: 'px-2',
        lg: '',
      },
    },
    defaultVariants: {
      variant: 'contained',
      size: 'md',
    },
  },
);

class Button extends Component {
  #props: Props;

  constructor(props: Props) {
    super();

    this.#props = {
      type: 'button',
      size: 'md',
      variant: 'contained',
      ...props,
    };
  }

  onClick(e: MouseEvent) {}
  onKeyDown(e: KeyboardEvent) {}

  render() {
    const button: HTMLButtonElement = document.createElement('button');
    button.textContent = this.#props.text;

    button.classList.add(
      buttonVariants({ variant: this.#props.variant, size: this.#props.size }),
    );

    button.addEventListener('click', this.onClick);
    button.addEventListener('keydown', this.onKeyDown);

    this.rootElement.appendChild(button);
  }
}

export { Button };
