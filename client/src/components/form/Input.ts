import { Component } from '@/components/ComponentBase';
import { uniqueId } from '@/util/uniqueId';
import { cn } from '@/util/cn';
import { FieldProps, InputType as DirtyType } from './_types';
import { styles } from './_styles';

type InputType = Exclude<DirtyType, 'checkbox' | 'radio' | 'select' | 'textarea'>;

function classname(cname: string): string {
  return cname;
}

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
    field.className = cn(styles.field);

    const input: HTMLInputElement = document.createElement('input');
    input.className = cn(styles.input);
    input.type = this.#props.type;
    input.name = this.#props.name;
    input.id = this.#id;

    const label: HTMLLabelElement = document.createElement('label');
    label.className = cn(styles.label);
    label.textContent = this.#props.label;
    label.htmlFor = this.#id;

    field.appendChild(label);
    field.appendChild(input);

    this.rootElement.appendChild(field);
  }

  #validateEmail() {}
  #validateFile() {}
  #validatePassword() {}
}

export { Input };
