import { Component } from '@/core/Component';
import { html } from '@/shared/util/html';
import { cn } from '@/shared/util/cn';

//? add type 'hidden', could be useful
//? add month, week, range

export type InputType =
  | 'date'
  | 'email'
  | 'file'
  | 'number'
  | 'password'
  | 'tel'
  | 'text'
  | 'time';

type AllowedAttributes = {
  date: 'disabled' | 'max' | 'min' | 'readOnly' | 'required' | 'step';
  email: 'disabled' | 'maxLength' | 'minLength' | 'readOnly' | 'required';
  file: 'accept' | 'disabled' | 'capture' | 'multiple' | 'readOnly' | 'required';
  number: 'disabled' | 'max' | 'min' | 'step' | 'readOnly' | 'required';
  password: 'disabled' | 'maxLength' | 'minLength' | 'readOnly' | 'required';
  tel: 'disabled' | 'maxLength' | 'minLength' | 'readOnly' | 'required';
  time: 'disabled' | 'max' | 'min' | 'readOnly' | 'required' | 'step';
  text: 'disabled' | 'maxLength' | 'minLength' | 'readOnly' | 'required';
};

type HTMLAttributes = {
  [K in keyof AllowedAttributes]: Partial<Pick<HTMLInputElement, AllowedAttributes[K]>>;
};

export type Props<T extends InputType> = {
  type: T;
  id: string;
  name: string;
  attributes: HTMLAttributes[T];
};

export class Input<T extends InputType> extends Component {
  #props: Props<T>;
  #value: string = '';

  constructor(props: Props<T>) {
    super();

    this.#props = props;
  }

  render() {
    return html`
      <input
        type="${this.#props.type}"
        name="${this.#props.name}"
        id="${this.#props.id}"
        class="text-black invalid:border-error"
      />
    `;
  }
}
