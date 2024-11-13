import { Component } from '@/components/ComponentBase';
import {
  Field,
  FieldProps,
  InputType,
  SelectFieldProps,
  TextareaFieldProps,
} from './_types';

import { Checkbox } from './Checkbox';
import { Input } from './Input';
import { Radio } from './Radio';
import { Select } from './Select';
import { Textarea } from './Textarea';

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

  constructor(props: FormProps) {
    super();

    this.#props = {
      ...props,
    };
  }

  render() {}
}

//TODO: Dynamic form updates: allow addition and removal of form fields
//TODO: Field grouping
//TODO: custom error message for each field
//TODO: ensure aria attributes
//TODO: ensure keybord navigation works
//TODO: input sanitization
//TODO: input[type='file'] then switch enctype FROM application/x-www-form-urlencoded TO multipart/form-data
