import { Component } from '@/core/component';
import { cn } from '@/core/cn';
import { html } from '@/core/html';
// import { FieldProps } from './_types';

type InputType =
  | 'date'
  | 'email'
  | 'file'
  | 'number'
  | 'password'
  | 'tel'
  | 'text'
  | 'time';

type AttributeConfig = {
  date: 'disabled' | 'max' | 'min' | 'readOnly' | 'required' | 'step';
  email: 'disabled' | 'maxLength' | 'minLength' | 'readOnly' | 'required';
  file: 'accept' | 'disabled' | 'capture' | 'readOnly' | 'required';
  number: 'disabled' | 'max' | 'min' | 'step' | 'readOnly' | 'required';
  password: 'disabled' | 'maxLength' | 'minLength' | 'readOnly' | 'required';
  tel: 'disabled' | 'maxLength' | 'minLength' | 'readOnly' | 'required';
  time: 'disabled' | 'max' | 'min' | 'readOnly' | 'required' | 'step';
  text: 'disabled' | 'maxLength' | 'minLength' | 'readOnly' | 'required';
};

type HTMLAttributeTypes = {
  [K in keyof AttributeConfig]: Partial<Pick<HTMLInputElement, AttributeConfig[K]>>;
};

type FieldProps<T extends InputType> = {
  type: T;
  id: string;
  name: string;
  label: string;
  attributes: Partial<HTMLAttributeTypes[T]>;
};

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

export { Input };
