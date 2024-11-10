import { Component } from '@/components/ComponentBase';
import { uniqueId } from '@/util/uniqueId';
import { FieldProps } from './_types';
import { cn } from '@/util/cn';

class Textarea extends Component {
  #props: FieldProps<'textarea'>;
  #id: string;

  constructor(props: FieldProps<'textarea'>) {
    super();

    this.#props = { ...props };
    this.#id = uniqueId();

    this.render();
  }

  render() {
    const field: HTMLDivElement = document.createElement('div');
    field.className = cn('grid items-center max-w-xs');

    const textarea: HTMLTextAreaElement = document.createElement('textarea');
    textarea.className = cn('');
    textarea.name = this.#props.name;
    textarea.id = this.#id;

    const label: HTMLLabelElement = document.createElement('label');
    label.className = cn('text-sm');
    label.textContent = this.#props.label;
    label.htmlFor = this.#id;

    field.appendChild(label);
    field.appendChild(textarea);

    this.rootElement.appendChild(field);
  }
}

export { Textarea };
