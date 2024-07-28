import { SelectProps } from "./_types";

class Select {
  props: SelectProps;
  control: HTMLSelectElement;

  constructor(props: SelectProps) {
    this.props = props;
    this.control = document.createElement("select");
  }
}

export { Select };
