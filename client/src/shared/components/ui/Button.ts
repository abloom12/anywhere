import { cva, type VariantProps } from 'class-variance-authority';

import { Component } from '@/core/Component';
import { html } from '@/shared/util/html';
import { cn } from '@/shared/util/cn';

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
      style: {
        contained: ['rounded'],
        outlined: [
          'bg-transparent',
          'border-2',
          'border-solid',
          'rounded',
        ],
        text: ['bg-transparent'],
      },
      intent: {
        default: [],
        danger: [],
      },
    },
    compoundVariants: [
      {
        style: 'contained',
        intent: 'default',
        class: ['bg-primary', 'text-white'],
      },
      {
        style: 'contained',
        intent: 'danger',
        class: ['bg-error', 'text-white'],
      },
      {
        style: 'outlined',
        intent: 'default',
        class: ['border-primary', 'text-primary'],
      },
      {
        style: 'outlined',
        intent: 'danger',
        class: ['border-error', 'text-error'],
      },
      {
        style: 'text',
        intent: 'default',
        class: ['text-primary'],
      },
      {
        style: 'text',
        intent: 'danger',
        class: ['text-error'],
      },
    ],
    defaultVariants: {
      style: 'contained',
      intent: 'default',
    },
  },
);

export type Props = VariantProps<typeof buttonVariants> & {
  text: string;
  type?: 'submit' | 'button';
  style?: string;
  intent?: string;
  icon?: string;
};

export class Button extends Component {
  #props: Props;

  constructor(props: Props) {
    super();

    this.#props = {
      type: 'button',
      ...props,
    };
  }

  render() {
    return html`
      <button
        type="${this.#props.type}"
        class="${cn(
          buttonVariants({
            style: this.#props.style,
            intent: this.#props.intent,
          }),
        )}"
      >
        ${this.#props.text}
      </button>
    `;
  }
}
