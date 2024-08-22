import { cva, type VariantProps } from 'class-variance-authority';
import { mergeClasses } from '@/util/cn';

// states: normal, focus, hover, active, progress/loading, disabled
// contained, outlined/ghost, text

const buttonVariants = cva('disabled:pointer-events-none disabled:opacity-50', {
  variants: {
    variant: {
      default: '',
      outline: '',
      ghost: '',
    },
    size: {
      default: '',
      sm: '',
      lg: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type Props = {
  text: string;
  size?: string;
  variant?: string;
};

class Button {
  #props: Props;
  #element: HTMLButtonElement;

  constructor(props: Props) {
    this.#props = Object.assign({}, props);
    this.#element = document.createElement('button');
    this.#element.textContent = this.#props.text;
    this.#element.classList.add(buttonVariants());
  }
}

export { Button };
