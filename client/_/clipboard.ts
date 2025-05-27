// columnHelper.ts

// --- Column Type Definitions ---
export type AccessorColumn<T, V> = {
  type: 'accessor';
  id: string;
  accessorKey?: keyof T;
  accessorFn?: (row: T) => V;
  header?: string | (() => any);
  cell?: (info: { getValue: () => V; row: T }) => any;
  footer?: (props: { column: { id: string } }) => any;
};

export type DisplayColumn<T> = {
  type: 'display';
  id: string;
  header?: string | (() => any);
  cell: (props: { row: T }) => any;
  footer?: (props: { column: { id: string } }) => any;
};

export type GroupColumn<T> = {
  type: 'group';
  id: string;
  header?: string | (() => any);
  footer?: (props: { column: { id: string } }) => any;
  columns: Column<T>[];
};

export type Column<T> = AccessorColumn<T, any> | DisplayColumn<T> | GroupColumn<T>;

// --- Column Helper Factory ---
export function createColumnHelper<T>() {
  let autoId = 0;

  // Overload 1: accessor by key
  function accessor<K extends keyof T>(
    accessorKey: K,
    opts?: {
      id?: string;
      header?: string | (() => any);
      cell?: (info: { getValue: () => T[K]; row: T }) => any;
      footer?: (props: { column: { id: string } }) => any;
    },
  ): AccessorColumn<T, T[K]>;

  // Overload 2: accessor by function (requires explicit id)
  function accessor<V>(
    accessorFn: (row: T) => V,
    opts: {
      id: string;
      header?: string | (() => any);
      cell?: (info: { getValue: () => V; row: T }) => any;
      footer?: (props: { column: { id: string } }) => any;
    },
  ): AccessorColumn<T, V>;

  function accessor(arg: any, opts: any = {}): any {
    const isFn = typeof arg === 'function';
    const id = opts.id ?? (!isFn ? String(arg) : `accessor_${autoId++}`);

    return {
      type: 'accessor',
      id,
      ...(isFn ? { accessorFn: arg } : { accessorKey: arg as keyof T }),
      header: opts.header,
      cell: opts.cell,
      footer: opts.footer,
    };
  }

  function display(opts: {
    id: string;
    header?: string | (() => any);
    cell: (props: { row: T }) => any;
    footer?: (props: { column: { id: string } }) => any;
  }): DisplayColumn<T> {
    return {
      type: 'display',
      id: opts.id,
      header: opts.header,
      cell: opts.cell,
      footer: opts.footer,
    };
  }

  function group(opts: {
    id?: string;
    header?: string | (() => any);
    footer?: (props: { column: { id: string } }) => any;
    columns: Column<T>[];
  }): GroupColumn<T> {
    const id = opts.id ?? `group_${autoId++}`;
    return {
      type: 'group',
      id,
      header: opts.header,
      footer: opts.footer,
      columns: opts.columns,
    };
  }

  return { accessor, display, group };
}
