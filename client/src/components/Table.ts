import { Component } from '@/components/component';

// table, thead, tbody, tfoot, tr, th, td, colgroup, col

// table = table ref
// table.tHead = table header
// table.tFoot = table footer
// table.tBodies = html collection of table bodies
// table.rows = html collection
// table[rowID] = row ref
// table.caption = table caption

//* FEATURES
//*------------------------
//* bulk actions & multi select
//* group by (groups rows in collapsable container)
//* column sort
//* pagination
//* show/hide columns
//* row density control (row height)
//* sticky table header
//* fullscreen mode
//* table search (highlight words? or filter out rows? or both?)
//* inline edit
//* onRowClick => expand row, tooltip, popup, sidebar
//* if we don't do inline edit allow edit in onRowClick view
//* table data refresh button
//* tabed table?

//? THOUGHTS
//?------------------------

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
  }

  render() {
    const table: HTMLTableElement = document.createElement('table');

    const twrap: HTMLDivElement = document.createElement('div');

    const tcontrol: HTMLDivElement = document.createElement('div');

    const thead: HTMLTableSectionElement = document.createElement('thead');
    this.#props.headings.forEach(heading => {
      const th: HTMLTableCellElement = document.createElement('th');
      const headingNode = document.createTextNode(heading);
      th.appendChild(headingNode);
      thead.appendChild(th);
    });

    const tbody: HTMLTableSectionElement = document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);

    twrap.appendChild(tcontrol);
    twrap.appendChild(table);

    this.rootElement.appendChild(table);
  }
}

export { Table };
