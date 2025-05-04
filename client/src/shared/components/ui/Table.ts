import { Component } from '@/core/component';

// table = table ref
// table.tHead = table header
// table.tFoot = table footer
// table.tBodies = html collection of table bodies
// table.rows = html collection
// table[rowID] = row ref
// table.caption = table caption

//*------------------------
//* Elements
//*------------------------
//*| column sort
//*| show/hide columns
//*| table search (highlight words or filter out rows)
//*-------------------------
//* Top Bar
//*------------------------
//*| bulk actions - dropdown?
//*| multi select - button icon
//*|
//*| row density (sm, md, lg) - toggle btns
//*|
//*| fullscreen - button icon
//*| table refresh - button icon
//*-------------------------
//? pagination
//? tabed table
//? inline edit
//*-------------------------
//* onRowClick => expand row, tooltip, popup, sidebar
//* if we don't do inline edit allow edit in onRowClick view

type Props = {
  headings: string[];
};

class Table extends Component {
  #props: Props;

  constructor(props: Props) {
    super();

    this.#props = {
      ...props,
    };

    this.render();
  }

  protected render(): void {
    const table: HTMLTableElement = document.createElement('table');

    const twrap: HTMLDivElement = document.createElement('div');

    const tcontrol: HTMLDivElement = document.createElement('div');

    const thead: HTMLTableSectionElement =
      document.createElement('thead');
    this.#props.headings.forEach(heading => {
      const th: HTMLTableCellElement = document.createElement('th');
      const headingNode = document.createTextNode(heading);
      th.appendChild(headingNode);
      thead.appendChild(th);
    });

    const tbody: HTMLTableSectionElement =
      document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);

    twrap.appendChild(tcontrol);
    twrap.appendChild(table);

    this.rootElement.appendChild(table);
  }

  protected updateWithState(state: Record<string, any>): void {
    // upadte componet with new data
  }
}

export { Table };
