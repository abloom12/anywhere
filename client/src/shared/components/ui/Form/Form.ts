import { Component } from '@/core/Component';
import { cn } from '@/core/cn';

import { FormField, FieldProps } from '@/shared/components/ui/Form/FormField';
import { Fieldset } from '@/shared/components/ui/Form/Fieldset';

type FormProps = {
  name: string;
  fields: (
    | FieldProps
    | {
        legend: string;
        fields: FieldProps[];
      }
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
  onInput(e: Event) {}
  onSubmit(e: SubmitEvent) {
    e.preventDefault();

    const formData = new FormData(this.#form);
    const entries = formData.entries();
    const data = Object.fromEntries(entries);
  }
}
