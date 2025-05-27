type DataColumn<> = {
  type: 'data';
  id: string;
};

type DisplayColumn<> = {
  type: 'display';
  id: string;
};

export function createColumnHelper<T>() {}
