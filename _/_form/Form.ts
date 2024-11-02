//TODO: Dynamic form updates: allow addition and removal of form fields
//TODO: Field grouping
//TODO: custom error message for each field
//TODO: ensure aria attributes
//TODO: ensure keybord navigation works
//TODO: input sanitization
//TODO: input[type='file'] then switch enctype FROM application/x-www-form-urlencoded TO multipart/form-data

import { FormOptions as Options } from './_types';
import { Input } from './Input';
import { Select } from './Select';
import { Textarea } from './Textarea';

class Form {
  #options: Options;
  #form: HTMLFormElement;
  #fields: Map<string, Input | Textarea | Select>;

  constructor(options: Options) {
    this.#options = Object.assign({}, options);
    this.#form = document.createElement('form');
    this.#fields = new Map();

    this.#initializeFields();
  }

  #initializeFields() {
    this.#options.fields.forEach(field => {
      switch (field.type) {
        case 'checkbox': {
          break;
        }
        case 'radio': {
          break;
        }
        case 'select': {
          this.#fields.set(field.name, new Select(field));
          break;
        }
        case 'textarea': {
          this.#fields.set(field.name, new Textarea(field));
          break;
        }
        default: {
          this.#fields.set(field.name, new Input(field));
        }
      }
    });
  }

  populate() {}
  reset() {}

  addField() {}
  removeField() {}

  #onSubmit() {}
  #onDelete() {}
  #onChange() {}

  getValue(name: string) {
    const field = this.#fields.get(name as string);
    return field?.control.value;
  }
  setValue(name: string, value: string) {
    const field = this.#fields.get(name);

    if (field) {
      field.control.value = value;
    }
  }
  setDisabled(name: string, isDisabled: boolean) {
    const field = this.#fields.get(name);

    if (field) {
      field.control.disabled = isDisabled;
    }
  }
  setReadonly(name: string, isReadOnly: boolean) {
    const field = this.#fields.get(name);

    if (field) {
      field.control.disabled = isReadOnly;
    }
  }
  setRequired(name: string, isRequired: boolean) {
    const field = this.#fields.get(name);

    if (field) {
      field.control.disabled = isRequired;
    }
  }
}

export { Form };
