import { Component } from '@/components/ComponentBase';

type Field = {
  type: string;
  id: string;
  name: string;
  label: string;
  attributes: {};
};

type FormProps = {
  name: string;
  fields: Field[];
};

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
