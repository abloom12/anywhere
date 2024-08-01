//TODO: Dynamic form updates: allow addition and removal of form fields
//TODO: Field grouping
//TODO: custom error message for each field
//TODO: ensure aria attributes
//TODO: ensure keybord navigation works
//TODO: input sanitization
//TODO: input[type='file'] then switch enctype FROM application/x-www-form-urlencoded TO multipart/form-data

import { FormField } from './_types';
import { Input } from './Input';
import { Select } from './Select';
import { Textarea } from './Textarea';

type FieldGroup = {
  legend: string;
  fields: FormField[];
};

type FormControl = FormField | FieldGroup;

type FormOptions = {
  name: string;
  schema: FormField[];
};

class Form {
  options: FormOptions;
  formElement: HTMLFormElement;
  fields: Map<string, Input | Textarea | Select>;

  constructor(options: FormOptions) {
    this.options = Object.assign({}, options);
    this.formElement = document.createElement('form');
    this.fields = new Map();

    this.#initializeFields();
  }

  #initializeFields() {
    this.options.schema.forEach(field => {
      switch (field.type) {
        case 'checkbox': {
          break;
        }
        case 'radio': {
          break;
        }
        case 'select': {
          this.fields.set(field.name, new Select(field));
          break;
        }
        case 'textarea': {
          this.fields.set(field.name, new Textarea(field));
          break;
        }
        default: {
          this.fields.set(field.name, new Input(field));
        }
      }
    });
  }

  populate() {}
  reset() {}
  addField() {}
  removeField() {}
}

export { Form };
