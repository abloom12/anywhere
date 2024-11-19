import { FC } from '@/core/component';

type Props = {
  src: string;
};

const classname = {
  avatar: '',
  img: '',
};

export const Avatar: FC<Props> = (props: Props) => {
  const avatar: HTMLDivElement = document.createElement('div');
  avatar.className = classname.avatar;

  const img: HTMLImageElement = document.createElement('img');
  img.className = classname.img;

  avatar.appendChild(img);
  
  return avatar;
};
