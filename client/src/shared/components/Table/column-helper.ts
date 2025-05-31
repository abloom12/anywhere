type AccessorColumn<T, V> = {
  type: 'accessor';
  accessorKey?: keyof T;
  accessorFn?: (row: T) => V;
  header: string;
  cell?: (props: { getValue: () => V; row: T }) => string;
};

type KeyAccessorOpts<T, K extends keyof T> = {
  header: string;
  cell?: (props: { getValue: () => T[K]; row: T }) => string;
};

type FnAccessorOpts<T, V> = {
  header: string;
  cell?: (props: { getValue: () => V; row: T }) => string;
};

type DisplayColumn<T> = {
  type: 'display';
};

export type Column<T> = AccessorColumn<T, any> | DisplayColumn<T>;

export function createColumnHelper<T>() {
  function accessor<K extends keyof T>(
    accessorKey: K,
    opts: KeyAccessorOpts<T, K>,
  ): AccessorColumn<T, T[K]>;

  function accessor<V>(
    accessorFn: (row: T) => V,
    opts: FnAccessorOpts<T, V>,
  ): AccessorColumn<T, V>;

  function accessor<K extends keyof T, V>(
    accessor: K | ((row: T) => V),
    opts: KeyAccessorOpts<T, K> | FnAccessorOpts<T, V>,
  ): AccessorColumn<T, T[K] | V> {
    return typeof accessor === 'function' ?
        ({
          type: 'accessor' as const,
          accessorFn: accessor as (row: T) => any,
          header: opts.header,
          cell: opts.cell,
        } as AccessorColumn<T, any>)
      : ({
          type: 'accessor' as const,
          accessorKey: accessor,
          header: opts.header,
          cell: opts.cell,
        } as AccessorColumn<T, any>);
  }

  function display(opts: {}): DisplayColumn<T> {
    return {
      type: 'display',
      ...opts,
    };
  }

  return { accessor, display };
}

// Testing
type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor('firstName', {
    header: 'First Name',
  }),
  columnHelper.accessor(row => `${row.age}`, {
    header: 'Age',
  }),
];
