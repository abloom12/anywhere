import { SelectProps } from './_types';

class Select {
  props: SelectProps;
  control: HTMLSelectElement;
  label: HTMLLabelElement;
  skeleton: HTMLParagraphElement;

  constructor(props: SelectProps) {
    this.props = props;
    this.control = document.createElement('select');
    this.label = document.createElement('label');
    this.skeleton = document.createElement('p');
  }
}

export { Select };
