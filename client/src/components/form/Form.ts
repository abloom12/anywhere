import { Component } from '@/core/component';
import { Checkbox, Props as CheckboxProps } from './Checkbox';
import { Input, Props as InputProps } from './Input';
import { Radio, Props as RadioProps } from './Radio';
import { Select, Props as SelectProps } from './Select';
import { Textarea, Props as TextareaProps } from './Textarea';

type Field =
  | (CheckboxProps & { type: 'checkbox' })
  | (RadioProps & { type: 'radio' })
  | (SelectProps & { type: 'select' })
  | (TextareaProps & { type: 'textarea' })
  | InputProps<'date'>
  | InputProps<'email'>
  | InputProps<'file'>
  | InputProps<'number'>
  | InputProps<'password'>
  | InputProps<'tel'>
  | InputProps<'text'>
  | InputProps<'time'>;

type FieldGroup = {
  legend: string;
  fields: Field[];
};

type FormProps = {
  name: string;
  fields: (Field | FieldGroup)[];
  autofocus?: string;
};

function createField(field: Field): Component {
  switch (field.type) {
    case 'checkbox':
      return new Checkbox(field);
    case 'radio':
      return new Radio(field);
    case 'select':
      return new Select(field);
    case 'textarea':
      return new Textarea(field);
    default:
      return new Input(field);
  }
}

class Form extends Component {
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
        const fieldset: HTMLFieldSetElement = document.createElement('fieldset');

        const legend: HTMLLegendElement = document.createElement('legend');
        legend.textContent = field.legend;

        fieldset.appendChild(legend);

        for (const groupedField of field.fields) {
          const fieldComponent = createField(groupedField);
          fieldComponent.appendTo(fieldset);
        }

        this.#form.appendChild(fieldset);
      } else {
        const fieldComponent = createField(field);
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
