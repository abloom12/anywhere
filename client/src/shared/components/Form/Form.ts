import { Component } from '@/core/Component';
import { cn } from '@/shared/util/cn';
import { html } from '@/shared/util/html';

import { FormField, type FieldProps } from '@/shared/components/Form/FormField';
import { Fieldset } from '@/shared/components/Form/Fieldset';
import { Button, type Props as ButtonProps } from '@/shared/components/Button';

type FormProps = {
  buttons: ButtonProps[];
  fields: (
    | FieldProps
    | {
        legend: string;
        fields: FieldProps[];
      }
  )[];
  name: string;
  onSubmit: (data: Record<string, FormDataEntryValue>) => any;
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

  #onChange(e: Event) {}
  #onInput(e: Event) {}
  #onSubmit(e: SubmitEvent) {
    e.preventDefault();

    const formData = new FormData(this.#form);
    const entries = formData.entries();
    const data = Object.fromEntries(entries);

    this.#props.onSubmit(data);
  }

  render() {
    this.#form.name = this.#props.name;

    for (const field of this.#props.fields) {
      if ('legend' in field) {
        const { fields, legend } = field;
        const fieldset = new Fieldset({ legend });
        this.#form.append(fieldset.render());

        for (const groupedField of fields) {
          const formField = new FormField(groupedField as FieldProps);
          fieldset.append(formField.render());
        }
      } else {
        const formField = new FormField(field as FieldProps);
        this.#form.append(formField.render());
      }
    }

    for (const button of this.#props.buttons) {
      const formButton = new Button(button as ButtonProps);
      this.#form.append(formButton.render());
    }

    this.#form.addEventListener('submit', this.#onSubmit);
    this.#form.addEventListener('change', this.#onChange);
    this.#form.addEventListener('input', this.#onInput);

    return html`${this.#form}`;
  }

  populate() {
    // this.#form.elements[name | id]
  }
}
