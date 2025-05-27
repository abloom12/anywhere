import { Component } from '@/core/Component';
import { cn } from '@/shared/util/cn';
import { html } from '@/shared/util/html';

type TableProps = {
  caption?: string;
  data?: [];
};

export class Table extends Component {
  #props: TableProps;

  constructor(props: TableProps) {
    super();

    this.#props = props;
  }

  //? Possible methods
  populate(data: []) {}
  addRow() {}
  updateRow() {}
  deleteRow() {}

  render() {
    return html``;
  }
}
