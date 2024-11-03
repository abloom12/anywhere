import { cva, type VariantProps } from 'class-variance-authority';
import { Component } from '@/components/ComponentBase';
import { FieldProps, InputType as DirtyType } from './_types';
import { uniqueId } from '@/util/uniqueId';

const inputVariants = cva([], {
  variants: {},
  compoundVariants: [],
  defaultVariants: {},
});

type InputType = Exclude<DirtyType, 'checkbox' | 'radio' | 'select' | 'textarea'>;

type Props<T extends InputType> = FieldProps<T> & VariantProps<typeof inputVariants>;

class Input<T extends InputType> extends Component {
  #props: Props<T>;
  #id: string;

  constructor(props: Props<T>) {
    super();

    this.#props = { ...props };
    this.#id = uniqueId();

    this.render();
  }

  render() {
    const field: HTMLDivElement = document.createElement('div');

    const input: HTMLInputElement = document.createElement('input');
    input.type = this.#props.type;
    input.name = this.#props.name;
    input.id = this.#id;

    const label: HTMLLabelElement = document.createElement('label');
    label.textContent = this.#props.label;
    label.htmlFor = this.#id;

    field.appendChild(label);
    field.appendChild(input);

    this.rootElement.appendChild(field);
  }
}

export { Input };
