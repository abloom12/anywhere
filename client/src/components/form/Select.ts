import { Component } from '@/components/ComponentBase';
import { uniqueId } from '@/util/uniqueId';
import { cn } from '@/util/cn';
import { FieldProps } from './_types';
import { styles } from './_styles';

class Select extends Component {
  #props: FieldProps<'select'>;
  #id: string;

  constructor(props: FieldProps<'select'>) {
    super();

    this.#props = { ...props };
    this.#id = uniqueId();

    this.render();
  }

  render() {
    const field: HTMLDivElement = document.createElement('div');
    field.className = cn(styles.field);

    const select: HTMLSelectElement = document.createElement('select');
    select.className = cn(styles.input);
    select.name = this.#props.name;
    select.id = this.#id;

    const label: HTMLLabelElement = document.createElement('label');
    label.className = cn(styles.label);
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
