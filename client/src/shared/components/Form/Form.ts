import { Component } from '@/core/component';
import { Input } from '@/shared/components/Input';
import { Checkbox } from '@/shared/components/Checkbox';
import { Radio } from '@/shared/components/Radio';
import { Select } from '@/shared/components/Select';
import { Textarea } from '@/shared/components/Textarea';
import { Label } from '@/shared/components/Label';
import { Fieldset } from '@/shared/components/Fieldset';
import { FieldProps, FieldGroup } from './form.types';

import { html } from '@/core/html';

type FormProps = {
  name: string;
  fields: (FieldProps | FieldGroup)[];
  autofocus?: string;
};

class FormField extends Component {
  #props: FieldProps;
  #field: Component;

  constructor(props: FieldProps) {
    super();
    this.#props = {
      ...props,
    };

    switch (props.type) {
      case 'checkbox':
        this.#field = new Checkbox(props);
        break;
      case 'radio':
        this.#field = new Radio(props);
        break;
      case 'select':
        this.#field = new Select(props);
        break;
      case 'textarea':
        this.#field = new Textarea(props);
        break;
      default:
        this.#field = new Input(props);
    }

    this.render();
  }

  render() {
    const formfield = html`
      <div class="">
        ${Label({ text: this.#props.label })} ${this.#field.element}
        <p class=""></p>
      </div>
    `;

    this.rootElement.appendChild(formfield);
  }
}

export class Form extends Component {
  #props: FormProps;
  #form: HTMLFormElement = document.createElement('form');

  constructor(props: FormProps) {
    super();

    this.#props = {
      ...props,
    };

    this.render();
  }

  render() {
    this.#form.name = this.#props.name;

    for (const field of this.#props.fields) {
      if ('legend' in field) {
        const { fields, legend } = field;
        const fieldset = Fieldset({ legend });
        this.#form.appendChild(fieldset);

        for (const groupedField of fields) {
          const formField = new FormField(groupedField);
        }
      } else {
        const formField = new FormField(field);
      }
    }

    this.rootElement.appendChild(this.#form);
  }

  populate() {
    // this.#form.elements[name | id]
  }

  onChange(e: Event) {}

  onSubmit(e: SubmitEvent) {
    e.preventDefault();

    const formData = new FormData(this.#form);
    const entries = formData.entries();
    const data = Object.fromEntries(entries);
  }
}
