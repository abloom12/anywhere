import { Component } from '@/components/ComponentBase';
import { cn } from '@/util/cn';
import { Field, FieldGroup } from './_types';

import { Checkbox } from './Checkbox';
import { Input } from './Input';
import { Radio } from './Radio';
import { Select } from './Select';
import { Textarea } from './Textarea';
import { Button } from '../Button';
import { Legend } from 'chart.js';

// form.checkValidity(), form.reportValidity(), form.reset()

type Props = {
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

const classname = {
  form: 'text-black',
  fieldset: 'border px-2',
  legend: 'capitalize',
  thing: '',
};

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
    this.#form.className = 'text-black';
    this.#form.className = cn(classname.form);

    for (const field of this.#props.fields) {
      if ('legend' in field) {
        const fieldset: HTMLFieldSetElement = document.createElement('fieldset');
        fieldset.className = cn(classname.fieldset);

        const legend: HTMLLegendElement = document.createElement('legend');
        legend.className = cn(classname.legend);
        legend.textContent = field.legend;

        fieldset.appendChild(legend);

        for (const groupedField of field.fields) {
          const fieldComponent = getFieldByType(groupedField as Field);
          fieldComponent.appendTo(fieldset);
        }

        this.#form.appendChild(fieldset);
      } else {
        const fieldComponent = getFieldByType(field as Field);
        fieldComponent.appendTo(this.#form);
      }
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
