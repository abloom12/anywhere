import { Component } from '@/core/Component';
import { cn } from '@/shared/util/cn';
import { html } from '@/core/html';

// this.table = table ref
// this.table.tHead = table header
// this.table.tFoot = table footer
// this.table.tBodies = html collection of table bodies
// this.table.rows = html collection
// this.table[rowID] = row ref
// this.table.caption = table caption

type AccessorColumn<TData> = {
  type: 'accessor';
  accessorKey?: keyof TData;
  accessorFn?: (row: TData) => string | Node | HTMLElement;
  header: string;
  cell?: () => any;
};

type TableProps<TData> = {
  columns: AccessorColumn<TData>[];
  data?: TData[];
  caption?: string;
};

export class Table<TData extends {}> extends Component {
  #props: TableProps<TData>;
  #table = document.createElement('table');
  #tableHeader = document.createElement('thead');
  #tableBody = document.createElement('tbody');

  constructor(props: TableProps<TData>) {
    super();

    this.#props = props;

    this.#table.append(this.#tableHeader, this.#tableBody);
  }

  #buildTableHeader() {
    const trEle = document.createElement('tr');
    this.#props.columns.forEach(column => {
      const thEle = document.createElement('th');
      thEle.append(column.header);
      trEle.append(thEle);
    });
  }

  #buildTableRow(data: TData) {
    const trEle = document.createElement('tr');

    this.#props.columns.forEach(column => {
      const tdEle = document.createElement('td');
      trEle.append(tdEle);

      if (column.accessorKey) {
        const cellValue = data[column.accessorKey];
        tdEle.append(String(cellValue));
        return;
      }

      if (column.accessorFn) {
        return;
      }

      //TODO: do display column logic
    });
    return trEle;
  }

  populate(data: TData[]) {
    this.#table.tBodies[0].innerHTML = '';

    data.forEach(d => {
      const trEle = this.#buildTableRow(d);
      this.#table.tBodies[0].append(trEle);
    });
  }

  render() {
    return html`${this.#table}`;
  }
}
