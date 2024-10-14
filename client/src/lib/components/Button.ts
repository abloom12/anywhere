import { cva, type VariantProps } from 'class-variance-authority';
import { Component } from '@/lib/component';

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
  #element: HTMLButtonElement = document.createElement('button');

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

  render() {
    this.#element.textContent = this.#props.text;
    this.#element.classList.add(
      buttonVariants({ variant: this.#props.variant, size: this.#props.size }),
    );

    this.#element.addEventListener('click', this.onClick);

    this.rootEle.appendChild(this.#element);
  }
}

export { Button };
