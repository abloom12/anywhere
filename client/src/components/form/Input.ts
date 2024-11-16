import { Component } from '@/core/component';
import { FieldProps, InputType as DirtyType } from './_types';
import { cn } from '@/core/cn';

type InputType = Exclude<DirtyType, 'checkbox' | 'radio' | 'select' | 'textarea'>;

// Controlled Input/Component, keep stuff like input.value etc on class, make it reactive with proxy
// so if we do someting like setValue() that updates the proxy value it can auto update html

class Input<T extends InputType> extends Component {
  #props: FieldProps<T>;

  constructor(props: FieldProps<T>) {
    super();

    this.#props = { ...props };

    this.render();
  }

  protected render() {
    const test = /*html*/ `
      <div class="${cn('text-black')}">
        <label ref="mything" for="${this.#props.id}">${this.#props.label}</label>
        <input 
          type="${this.#props.type}" 
          name="${this.#props.name}" 
          id="${this.#props.id}"
        >
      </div>
    `;

    const field: HTMLDivElement = document.createElement('div');

    const input: HTMLInputElement = document.createElement('input');
    input.type = this.#props.type;
    input.name = this.#props.name;
    input.id = this.#props.id;

    const label: HTMLLabelElement = document.createElement('label');
    label.textContent = this.#props.label;
    label.htmlFor = this.#props.id;

    field.appendChild(label);
    field.appendChild(input);

    this.rootElement.appendChild(field);
  }
}

export { Input };
