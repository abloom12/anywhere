import { Props as InputProps } from '@/components/Input';
import { Props as CheckboxProps } from '@/components/Checkbox';
import { Props as RadioProps } from '@/components/Radio';
import { Props as SelectProps } from '@/components/Select';
import { Props as TextareaProps } from '@/components/Textarea';

export type FieldProps = {
  label: string;
} & (
  | (CheckboxProps & { type: 'checkbox' })
  | (RadioProps & { type: 'radio' })
  | (SelectProps & { type: 'select' })
  | (TextareaProps & { type: 'textarea' })
  | InputProps<'date'>
  | InputProps<'email'>
  | InputProps<'file'>
  | InputProps<'number'>
  | InputProps<'password'>
  | InputProps<'tel'>
  | InputProps<'text'>
  | InputProps<'time'>
);

export type FieldGroup = {
  legend: string;
  fields: FieldProps[];
};
