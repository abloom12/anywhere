import { Component } from '@/core/component';
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
  email:
    | 'disabled'
    | 'maxLength'
    | 'minLength'
    | 'readOnly'
    | 'required';
  file:
    | 'accept'
    | 'disabled'
    | 'capture'
    | 'multiple'
    | 'readOnly'
    | 'required';
  number:
    | 'disabled'
    | 'max'
    | 'min'
    | 'step'
    | 'readOnly'
    | 'required';
  password:
    | 'disabled'
    | 'maxLength'
    | 'minLength'
    | 'readOnly'
    | 'required';
  tel:
    | 'disabled'
    | 'maxLength'
    | 'minLength'
    | 'readOnly'
    | 'required';
  time: 'disabled' | 'max' | 'min' | 'readOnly' | 'required' | 'step';
  text:
    | 'disabled'
    | 'maxLength'
    | 'minLength'
    | 'readOnly'
    | 'required';
};

type HTMLAttributes = {
  [K in keyof AllowedAttributes]: Partial<
    Pick<HTMLInputElement, AllowedAttributes[K]>
  >;
};

export type Props<T extends InputType> = {
  type: T;
  id: string;
  name: string;
  attributes: HTMLAttributes[T];
};

const classname = {
  field: cn('grid items-center w-full'),
  input: cn('text-black leading-normal rounded py-1.5 px-3'),
};

export class Input<T extends InputType> extends Component {
  #props: Props<T>;
  #value: string = '';

  constructor(props: Props<T>) {
    super();

    this.#props = { ...props };

    this.render();
  }

  protected render() {
    const input: HTMLInputElement = document.createElement('input');
    input.className = classname.input;
    input.type = this.#props.type;
    input.name = this.#props.name;
    input.id = this.#props.id;

    this.rootElement.appendChild(input);
  }
}
