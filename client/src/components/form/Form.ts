import { cva, type VariantProps } from 'class-variance-authority';
import { Component } from '@/components/ComponentBase';
import { Field } from './_types';

import { Checkbox } from './Checkbox';
import { Input } from './Input';
import { Radio } from './Radio';
import { Select } from './Select';
import { Textarea } from './Textarea';
import { Button } from '@/components/Button';

const formVariants = cva([], {
  variants: {},
  compoundVariants: [],
  defaultVariants: {},
});

type FieldGroup = {
  legend: string;
  fields: Field[];
};

type FormOptions = {
  name: string;
  fields: Field[];
  autofocus?: string;
};

type Props = VariantProps<typeof formVariants> & {};

class Form extends Component {
  #props: Props;

  constructor(props: Props) {
    super();

    this.#props = { ...props };

    this.render();
  }

  render() {
    const form: HTMLFormElement = document.createElement('form');

    // this.rootElement.appendChild();
  }
}

class StepForm extends Component {
  #props: Props;

  constructor(props: Props) {
    super();

    this.#props = { ...props };
  }

  render() {
    // this.rootElement.appendChild();
  }
}

export { Form };
