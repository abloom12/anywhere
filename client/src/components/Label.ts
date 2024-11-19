import { FC } from '@/core/component';

type Props = {
  text: string;
};

const classname = 'text-black text-sm capitalize';

export const Label: FC<Props> = (props: Props) => {
  const labelElement: HTMLLabelElement = document.createElement('label');
  labelElement.textContent = props.text;
  labelElement.className = classname;
  return labelElement;
};
