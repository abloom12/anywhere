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
    this.control.id = id;
    this.control.value = 'testing';

    this.label.textContent = this.props.label;
    this.label.setAttribute('for', id);
  }

  //? Could move all this to the form and use form.setDisabled('inputname')
  getValue(): string {
    return this.control.value;
  }

  setValue(value: string) {
    this.control.value = value;
  }

  setDisabledState(isDisabled: boolean) {
    this.control.disabled = isDisabled;
  }
  setReadonlyState(isReadOnly: boolean) {
    this.control.readOnly = isReadOnly;
  }
  setRequiredState(isRequired: boolean) {
    this.control.required = isRequired;
  }
}

export { Input };

// form.setDisabledState('inputname', true)
// form.fields['inputname']setDisabledState(true)
