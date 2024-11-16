import { Component } from '@/core/component';
import { cn } from '@/core/cn';
import { html } from '@/core/html';
import { FieldProps, InputType as DirtyType } from './_types';

type InputType = Exclude<DirtyType, 'checkbox' | 'radio' | 'select' | 'textarea'>;

// Controlled Input/Component, keep stuff like input.value etc on class, make it reactive with proxy
// so if we do someting like setValue() that updates the proxy value it can auto update html

class Input<T extends InputType> extends Component {
  #props: FieldProps<T>;
  #value: string = '';

  constructor(props: FieldProps<T>) {
    super();

    this.#props = { ...props };

    this.render();
  }

  protected render() {
    this.rootElement.appendChild(html`
      <div class="${cn('text-black')}">
        <label
          ref="mything"
          for="${this.#props.id}"
          >${this.#props.label}</label
        >
        <input
          type="${this.#props.type}"
          name="${this.#props.name}"
          id="${this.#props.id}"
        />
      </div>
    `);
  }
}

class Input2<T extends InputType> extends Component {
  #props: FieldProps<T>;

  constructor(props: FieldProps<T>) {
    super();

    this.#props = { ...props };

    this.render();
  }

  protected render() {
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

export { Input, Input2 };
