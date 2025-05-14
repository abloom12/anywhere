import { Component } from '@/core/Component';
import { cn } from '@/shared/util/cn';
import { html } from '@/shared/util/html';

import { FormField, FieldProps } from '@/shared/components/ui/Form/FormField';
import { Fieldset } from '@/shared/components/ui/Form/Fieldset';
import { Props as ButtonProps } from '@/shared/components/ui/Button';

export { field, action } from './form.config';

type FormProps = {
  name: string;
  fields: (
    | FieldProps
    | {
        legend: string;
        fields: FieldProps[];
      }
    | ButtonProps
  )[];
  autofocus?: string;
};

export class Form extends Component {
  #props: FormProps;
  #form: HTMLFormElement = document.createElement('form');

  constructor(props: FormProps) {
    super();

    this.#props = {
      ...props,
    };
  }

  render() {
    this.#form.name = this.#props.name;

    for (const field of this.#props.fields) {
      // console.log(field);

      if ('legend' in field) {
        const { fields, legend } = field;
        const fieldset = new Fieldset({ legend });
        this.#form.append(fieldset.render());

        for (const groupedField of fields) {
          const formField = new FormField(groupedField);
          fieldset.append(formField.render());
        }
      } else {
        const formField = new FormField(field as FieldProps);
        this.#form.append(formField.render());
      }
    }

    return html`${this.#form}`;
  }

  populate() {
    // this.#form.elements[name | id]
  }
  onChange(e: Event) {}
  onInput(e: Event) {}
  onSubmit(e: SubmitEvent) {
    e.preventDefault();

    const formData = new FormData(this.#form);
    const entries = formData.entries();
    const data = Object.fromEntries(entries);
  }
}
