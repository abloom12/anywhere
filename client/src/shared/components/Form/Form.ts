import { Component } from '@/core/Component';
import { cn } from '@/shared/util/cn';
import { html } from '@/shared/util/html';

import { Button, type Props as ButtonProps } from '@/shared/components/Button';

import { FormField, type FieldProps, type FieldTypes } from './FormField';
import { Fieldset } from './Fieldset';

type SingleFieldName<F> = F extends { name: infer N extends string } ? N : never;
type GroupFieldName<F> =
  F extends { fields: infer G extends ReadonlyArray<any> } ?
    G[number] extends { name: infer NG extends string } ?
      NG
    : never
  : never;
type UnwrapField<F> = SingleFieldName<F> | GroupFieldName<F>;
type AllNamesFromTuple<T extends ReadonlyArray<any>> = UnwrapField<T[number]>;

export type DataFromFields<T extends ReadonlyArray<any>> = {
  [K in AllNamesFromTuple<T>]: FormDataEntryValue;
};

type FormProps<
  F extends ReadonlyArray<
    | FieldProps<FieldTypes>
    | { legend: string; fields: ReadonlyArray<FieldProps<FieldTypes>> }
  >,
> = {
  buttons: ButtonProps[];
  fields: F;
  name: string;
  onSubmit: (data: DataFromFields<F>, formInstance: Form<F>) => any;
  autofocus?: string;
};

export class Form<
  F extends ReadonlyArray<
    | FieldProps<FieldTypes>
    | { legend: string; fields: ReadonlyArray<FieldProps<FieldTypes>> }
  >,
> extends Component {
  #props: FormProps<F>;
  #form: HTMLFormElement = document.createElement('form');

  constructor(props: FormProps<F>) {
    super();

    this.#props = props;
  }

  #onChange(e: Event) {}
  #onInput(e: Event) {}
  #onSubmit(e: SubmitEvent) {
    e.preventDefault();

    const formData = new FormData(this.#form);
    const entries = formData.entries();
    const data = Object.fromEntries(entries) as DataFromFields<F>;

    this.#props.onSubmit(data, this);
  }

  render() {
    this.#form.name = this.#props.name;

    for (const field of this.#props.fields) {
      if ('legend' in field) {
        const { fields, legend } = field;
        const fieldset = new Fieldset({ legend });
        this.#form.append(fieldset.render());

        for (const groupedField of fields) {
          const formField = new FormField<typeof groupedField.type>(groupedField);
          fieldset.append(formField.render());
        }
      } else {
        const formField = new FormField<typeof field.type>(field);
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
