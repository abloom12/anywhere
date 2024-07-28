type LabelProps = {
  labelText: string;
  targetInput: string;
};

class Label {
  label: HTMLLabelElement;
  skeleton: HTMLParagraphElement;

  constructor() {
    this.label = document.createElement("label");
    this.skeleton = document.createElement("p");
  }
}

export { Label };
