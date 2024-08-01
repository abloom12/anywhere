import { InputProps as Props } from './_types';
import { uniqueId } from '@/util';

class Input {
  props: Props;
  control: HTMLInputElement;
  label: HTMLLabelElement;
  skeleton: DocumentFragment;

  constructor(props: Props) {
    this.props = Object.assign({}, props);
    this.control = document.createElement('input');
    this.label = document.createElement('label');
    this.skeleton = new DocumentFragment();

    this.#initialize();
  }

  #initialize() {
    const id = uniqueId();
    this.control.type = this.props.type;
    this.control.id = id;
    this.label.textContent = this.props.label;
    this.label.setAttribute('for', id);

    // skeleton
    const skeletonControl = document.createElement('p');
    const skeletonLabel = document.createElement('p');
    this.skeleton.appendChild(skeletonLabel);
    this.skeleton.appendChild(skeletonControl);
  }

  setValue(value: string) {
    this.control.value = value;
  }
}

export { Input };
