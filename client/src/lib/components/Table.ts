import { Component } from '@/lib/core/component';

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
//? Do I even need this.#element? user shouldn't have to do anything to the dom element of any component.

type Props = {
  headings: string[];
};

class Table extends Component {
  #props: Props;
  #element: HTMLTableElement = document.createElement('table');

  constructor(props: Props) {
    super();

    this.#props = {
      ...props,
    };
  }

  render() {
    const twrap = document.createElement('div');

    const tcontrol = document.createElement('div');

    const thead = document.createElement('thead');
    this.#props.headings.forEach(heading => {
      const th = document.createElement('th');
      //const headingNode = document.createTextNode(heading);
      th.textContent = heading;
      thead.appendChild(th);
    });

    const tbody = document.createElement('tbody');

    this.#element.appendChild(thead);
    this.#element.appendChild(tbody);

    twrap.appendChild(tcontrol);
    twrap.appendChild(this.#element);

    this.rootElement.appendChild(this.#element);
  }
}

export { Table };
