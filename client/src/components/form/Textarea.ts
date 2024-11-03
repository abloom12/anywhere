import { cva, type VariantProps } from 'class-variance-authority';
import { Component } from '@/components/ComponentBase';
import { FieldProps } from './_types';
import { uniqueId } from '@/util/uniqueId';

const textAreaVariants = cva([], {
  variants: {},
  compoundVariants: [],
  defaultVariants: {},
});

type Props = FieldProps<'textarea'> & VariantProps<typeof textAreaVariants>;

class Textarea extends Component {
  #props: Props;
  #id: string;

  constructor(props: Props) {
    super();

    this.#props = { ...props };
    this.#id = uniqueId();

    this.render();
  }

  render() {
    const field: HTMLDivElement = document.createElement('div');

    const textarea: HTMLTextAreaElement = document.createElement('textarea');
    textarea.name = this.#props.name;
    textarea.id = this.#id;

    const label: HTMLLabelElement = document.createElement('label');
    label.textContent = this.#props.label;
    label.htmlFor = this.#id;

    field.appendChild(label);
    field.appendChild(textarea);

    this.rootElement.appendChild(field);
  }
}

export { Textarea };
