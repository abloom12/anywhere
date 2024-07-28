//TODO: Dynamic form updates: allow addition and removal of form fields
//TODO: Field grouping
//TODO: custom error message for each field
//TODO: ensure aria attributes
//TODO: ensure keybord navigation works
//TODO: input sanitization
//TODO: if form has input[type='file'] then switch enctype FROM application/x-www-form-urlencoded TO multipart/form-data

//TODO: need to figure a way to allow forms to be mutlipage forms

import { FormOptions } from "./_types";
import { Input } from "./Input";
import { Select } from "./Select";
import { Textarea } from "./Textarea";

class Form {
  options: FormOptions;
  form: HTMLFormElement;
  fields: Map<string, Input | Textarea | Select>;

  constructor(options: FormOptions) {
    this.options = options;
    this.form = document.createElement("form");
    this.fields = new Map();

    this.#initializeFields();
  }

  #initializeFields() {
    this.options.fields.forEach((field, index) => {
      const id = `${this.options.name}${field.name}${index}`;

      switch (field.type) {
        case "checkbox": {
          break;
        }
        case "radio": {
          break;
        }
        case "select": {
          this.fields.set(field.name, new Select({ id, ...field }));
          break;
        }
        case "textarea": {
          this.fields.set(field.name, new Textarea({ id, ...field }));
          break;
        }
        default: {
          this.fields.set(field.name, new Input({ id, ...field }));
        }
      }
    });
  }

  #buildSkeleton() {
    // loop through this.fields and build out skeleton
    for (const [key, value] of this.fields) {
    }
  }

  populate() {
    // loop through this.fields replacing each skeleton field with control
  }

  reset() {
    this.form.reset();
  }

  renderTo(element: HTMLElement) {
    element.appendChild(this.form);
  }
}

export { Form };
