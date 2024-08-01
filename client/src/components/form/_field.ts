import {
  CheckboxProps,
  InputProps,
  TextareaProps,
  RadioProps,
  SelectProps,
  HTMLInputType,
} from './_types';

type ConfigCreators = {
  checkbox: (type: 'checkbox', name: string, label: string) => CheckboxProps;
  input: (type: HTMLInputType, name: string, label: string) => InputProps;
  radio: (type: 'radio', name: string, label: string) => RadioProps;
  select: (type: 'select', name: string, label: string) => SelectProps;
  textarea: (type: 'textarea', name: string, label: string) => TextareaProps;
};

const field: ConfigCreators = {
  checkbox: (type, name, label) => ({
    type,
    name,
    label,
  }),
  input: (type, name, label) => ({
    type,
    name,
    label,
  }),
  radio: (type, name, label) => ({
    type,
    name,
    label,
  }),
  select: (type, name, label) => ({
    type,
    name,
    label,
  }),
  textarea: (type, name, label) => ({
    type,
    name,
    label,
  }),
};

export { field };
