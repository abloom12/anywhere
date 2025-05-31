import { Table } from '@/shared/components/Table/Table';

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const people: Person[] = [
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    age: 28,
    visits: 5,
    status: 'single',
    progress: 70,
  },
  {
    firstName: 'Brian',
    lastName: 'Smith',
    age: 35,
    visits: 12,
    status: 'married',
    progress: 45,
  },
  {
    firstName: 'Cynthia',
    lastName: 'Lee',
    age: 42,
    visits: 8,
    status: 'complicated',
    progress: 90,
  },
];

const table = new Table<Person>({
  columns: [
    { type: 'accessor', accessorKey: 'firstName', header: 'First Name' },
    { type: 'accessor', accessorKey: 'age', header: 'Age' },
  ],
});
