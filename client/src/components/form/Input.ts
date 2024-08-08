import { InputProps as Props } from './_types';
import { uniqueId } from '@/util';

class Input {
  props: Props;
  control: HTMLInputElement;
  label: HTMLLabelElement;
  message: HTMLParagraphElement;

  constructor(props: Props) {
    this.props = Object.assign({}, props);
    this.control = document.createElement('input');
    this.label = document.createElement('label');
    this.message = document.createElement('p');

    this.#initialize();
  }

  #initialize() {
    const id = uniqueId();

    this.control.type = this.props.type;
    this.control.name = this.props.name;
    this.control.id = id;

    this.label.textContent = this.props.label;
    this.label.setAttribute('for', id);
  }
}

export { Input };
