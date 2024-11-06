import { cva, type VariantProps } from 'class-variance-authority';
import { Component } from '@/components/ComponentBase';
import { FieldProps } from './_types';
import { uniqueId } from '@/util/uniqueId';

const selectVariants = cva([], {
  variants: {},
  compoundVariants: [],
  defaultVariants: {},
});

type Props = FieldProps<'select'> & VariantProps<typeof selectVariants>;

class Select extends Component {
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

    const select: HTMLSelectElement = document.createElement('select');
    select.name = this.#props.name;
    select.id = this.#id;

    const label: HTMLLabelElement = document.createElement('label');
    label.textContent = this.#props.label;
    label.htmlFor = this.#id;

    field.appendChild(label);
    field.appendChild(select);

    this.rootElement.appendChild(field);
  }

  populate(data: []) {}
  setValue(value: string) {}
}

export { Select };
