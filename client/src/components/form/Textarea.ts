import { TextareaProps } from './_types';

//? wrap attribute?

class Textarea {
  props: TextareaProps;
  control: HTMLTextAreaElement;
  label: HTMLLabelElement;
  skeleton: HTMLParagraphElement;

  constructor(props: TextareaProps) {
    this.props = props;
    this.control = document.createElement('textarea');
    this.label = document.createElement('label');
    this.skeleton = document.createElement('p');
  }
}

export { Textarea };
