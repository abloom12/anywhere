class Dialog {
  props: {};
  dialog: HTMLDialogElement;

  constructor(props: {}) {
    this.props = Object.assign({}, props);
    this.dialog = document.createElement('dialog');

    // this.dialog.close();
    // this.dialog.show();
    // this.dialog.showModal();
    // this.dialog.open
  }
}

export { Dialog };
