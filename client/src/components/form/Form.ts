import { cva, type VariantProps } from 'class-variance-authority';
import { Component } from '@/components/ComponentBase';
import { Field, FieldGroup, FieldProps, InputType } from './_types';

import { Checkbox } from './Checkbox';
import { Input } from './Input';
import { Radio } from './Radio';
import { Select } from './Select';
import { Textarea } from './Textarea';
import { Button } from '../Button';

// form.checkValidity(), form.reportValidity(), form.reset()

const formVariants = cva([], {
  variants: {},
  compoundVariants: [],
  defaultVariants: {},
});

type Props = VariantProps<typeof formVariants> & {
  name: string;
  fields: (Field | FieldGroup)[];
  autofocus?: string;
};

function getFieldByType(field: Field) {
  if (field.type === 'checkbox') {
    return new Checkbox(field);
  }
  if (field.type === 'radio') {
    return new Radio(field);
  }
  if (field.type === 'select') {
    return new Select(field);
  }
  if (field.type === 'textarea') {
    return new Textarea(field);
  }

  return new Input(field);
}

class Form extends Component {
  #props: Props;
  #form: HTMLFormElement = document.createElement('form');

  constructor(props: Props) {
    super();

    this.#props = { ...props };

    this.render();
  }

  render() {
    this.#form.name = this.#props.name;

    for (const field of this.#props.fields) {
      if ('legend' in field) {
        const fieldset: HTMLFieldSetElement = document.createElement('fieldset');
        const legend: HTMLLegendElement = document.createElement('legend');

        fieldset.appendChild(legend);

        for (const groupedField of field.fields) {
          const fieldComponent = getFieldByType(groupedField as Field);
          fieldComponent.appendTo(fieldset);
        }

        this.#form.appendChild(fieldset);
      }

      const fieldComponent = getFieldByType(field as Field);
      fieldComponent.appendTo(this.#form);
    }

    this.rootElement.appendChild(this.#form);
  }

  populate() {
    // this.#form.elements[name | id]
  }

  onSubmit(e: SubmitEvent) {
    e.preventDefault();

    const formData = new FormData(this.#form);
    const entries = formData.entries();
    const data = Object.fromEntries(entries);
  }
}

export { Form };
