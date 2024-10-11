import { cva, type VariantProps } from 'class-variance-authority';
//import { mergeClasses } from '@/util/cn';

// states: normal, focus, hover, active, progress/loading, disabled
// variants: contained, outlined/ghost, text
// emphasis: high: default/contained, med: outlined/ghost, low: text

//! Rules
//! use capitlization
//! don't wrap text

const buttonVariants = cva(['disabled:pointer-events-none', 'disabled:opacity-50'], {
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
});

type Props = {
  text: string;
  type?: 'submit' | 'button';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'contained' | 'ghost' | 'text';
  icon?: string;
};

class Button {
  #props: Props;
  #element: HTMLButtonElement;

  constructor(props: Props) {
    this.#props = { ...props };
    this.#element = document.createElement('button');
    this.#element.textContent = this.#props.text;
    this.#element.classList.add(buttonVariants({ variant: this.#props.variant, size: this.#props.size }));
  }
}

export { Button };
