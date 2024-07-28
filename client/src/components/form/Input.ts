import { InputProps } from "./_types";

class Input {
  props: InputProps;
  control: HTMLInputElement;
  skeleton: HTMLParagraphElement;

  constructor(props: InputProps) {
    this.props = props;
    this.control = document.createElement("input");
    this.skeleton = document.createElement("p");
  }

  setValue() {}
}

export { Input };
