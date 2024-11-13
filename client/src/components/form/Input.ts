import { Component } from '@/components/ComponentBase';
import { cn } from '@/util/cn';
import { FieldProps, InputType as DirtyType } from './_types';
import { styles } from './_styles';

type InputType = Exclude<DirtyType, 'checkbox' | 'radio' | 'select' | 'textarea'>;

class Input<T extends InputType> extends Component {
  #props: FieldProps<T>;

  constructor(props: FieldProps<T>) {
    super();

    this.#props = { ...props };

    this.render();
  }

  protected render() {
    const field: HTMLDivElement = document.createElement('div');
    field.className = cn(styles.field);

    const input: HTMLInputElement = document.createElement('input');
    input.className = cn(styles.input);
    input.type = this.#props.type;
    input.name = this.#props.name;
    input.id = this.#props.id;

    const label: HTMLLabelElement = document.createElement('label');
    label.className = cn(styles.label);
    label.textContent = this.#props.label;
    label.htmlFor = this.#props.id;

    field.appendChild(label);
    field.appendChild(input);

    this.rootElement.appendChild(field);
  }
}

// const a = new Input({
//   type: 'text',
//   name: 'test',
//   label: 'test',
//   id: 'test',
//   attributes: {
//     min: 'hey',
//   },
// });

export { Input };
