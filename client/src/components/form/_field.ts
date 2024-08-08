import { CheckboxProps, InputProps, TextareaProps, RadioProps, SelectProps } from './_types';

type ConfigParams = [name: string, label: string];

type ConfigCreators = {
  checkbox: (...args: ConfigParams) => CheckboxProps;
  date: (name: string, label: string) => InputProps;
  email: (name: string, label: string) => InputProps;
  file: (name: string, label: string) => InputProps;
  image: (name: string, label: string) => InputProps;
  number: (name: string, label: string) => InputProps;
  password: (name: string, label: string) => InputProps;
  radio: (name: string, label: string) => RadioProps;
  select: (name: string, label: string) => SelectProps;
  telephone: (name: string, label: string) => InputProps;
  text: (name: string, label: string) => InputProps;
  textarea: (name: string, label: string) => TextareaProps;
};

const field: ConfigCreators = {
  checkbox: (name, label) => ({
    type: 'checkbox',
    name,
    label,
  }),
  date: (name, label) => ({
    type: 'date',
    name,
    label,
  }),
  email: (name, label) => ({
    type: 'email',
    name,
    label,
  }),
  file: (name, label) => ({
    type: 'file',
    name,
    label,
  }),
  image: (name, label) => ({
    type: 'image',
    name,
    label,
  }),
  number: (name, label) => ({
    type: 'number',
    name,
    label,
  }),
  password: (name, label) => ({
    type: 'password',
    name,
    label,
  }),
  radio: (name, label) => ({
    type: 'radio',
    name,
    label,
  }),
  select: (name, label) => ({
    type: 'select',
    name,
    label,
  }),
  telephone: (name, label) => ({
    type: 'tel',
    name,
    label,
  }),
  text: (name, label) => ({
    type: 'text',
    name,
    label,
  }),
  textarea: (name, label) => ({
    type: 'textarea',
    name,
    label,
  }),
};

export { field };
