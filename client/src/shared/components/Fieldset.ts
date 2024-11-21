import { FC } from '@/core/component';

type Props = {
  legend: string;
};

const classname = {
  fieldset: '',
  legend: '',
};

export const Fieldset: FC<Props> = (props: Props) => {
  const fieldset: HTMLFieldSetElement = document.createElement('fieldset');
  fieldset.className = classname.fieldset;

  const legend: HTMLLegendElement = document.createElement('legend');
  legend.className = classname.fieldset;
  legend.textContent = props.legend;

  fieldset.appendChild(legend);

  return fieldset;
};
