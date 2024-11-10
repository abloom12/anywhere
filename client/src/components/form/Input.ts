import { Component } from '@/components/ComponentBase';
import { uniqueId } from '@/util/uniqueId';
import { FieldProps, InputType as DirtyType } from './_types';
import { cn } from '@/util/cn';

type InputType = Exclude<DirtyType, 'checkbox' | 'radio' | 'select' | 'textarea'>;

class Input<T extends InputType> extends Component {
  #props: FieldProps<T>;
  #id: string;

  constructor(props: FieldProps<T>) {
    super();

    this.#props = { ...props };
    this.#id = uniqueId();

    this.render();
  }

  render() {
    const field: HTMLDivElement = document.createElement('div');
    field.className = cn('grid items-center w-full max-w-xs');

    const input: HTMLInputElement = document.createElement('input');
    input.className = cn('rounded');

    input.type = this.#props.type;
    input.name = this.#props.name;
    input.id = this.#id;

    const label: HTMLLabelElement = document.createElement('label');
    label.className = cn('text-sm');
    label.textContent = this.#props.label;
    label.htmlFor = this.#id;

    field.appendChild(label);
    field.appendChild(input);

    this.rootElement.appendChild(field);
  }
}

export { Input };
