import { Component } from "@/components/ComponentBase";
import { uniqueId } from "@/util/uniqueId";
import { cn } from "@/util/cn";
import { FieldProps } from "./_types";
import { styles } from "../../../client/src/components/form2/_styles";

class Textarea extends Component {
  #props: FieldProps<"textarea">;
  #id: string;

  constructor(props: FieldProps<"textarea">) {
    super();

    this.#props = { ...props };
    this.#id = uniqueId();

    this.render();
  }

  render() {
    const field: HTMLDivElement = document.createElement("div");
    field.className = cn(styles.field);

    const textarea: HTMLTextAreaElement = document.createElement("textarea");
    textarea.className = cn(styles.input);
    textarea.name = this.#props.name;
    textarea.id = this.#id;

    const label: HTMLLabelElement = document.createElement("label");
    label.className = cn(styles.label);
    label.textContent = this.#props.label;
    label.htmlFor = this.#id;

    field.appendChild(label);
    field.appendChild(textarea);

    this.rootElement.appendChild(field);
  }
}

export { Textarea };
