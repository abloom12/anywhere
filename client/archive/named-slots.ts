// @ts-nocheck

class Component {}

type ViewProps = {
  header?: Component;
  content?: Component;
  footer?: Component;
};

class View extends Component {
  #props: ViewProps;
  #element: HTMLElement = document.createElement('div');

  constructor(props: ViewProps) {
    super();
    this.#props = props;
  }

  render() {
    this.#element.classList.add('view-component');

    // Insert components into their corresponding slots
    this.insertSlot('header', this.#props.header);
    this.insertSlot('content', this.#props.content);
    this.insertSlot('footer', this.#props.footer);
  }

  // Slot insertion logic
  insertSlot(slotName: string, childComponent?: Component) {
    const slot = this.#element.querySelector(`[slot="${slotName}"]`);
    if (slot && childComponent) {
      slot.appendChild(childComponent.render());
    }
  }
}
