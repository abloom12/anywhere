import { TextareaProps } from "./_types";

class Textarea {
  props: TextareaProps;
  control: HTMLTextAreaElement;

  constructor(props: TextareaProps) {
    this.props = props;
    this.control = document.createElement("textarea");
  }
}

export { Textarea };
