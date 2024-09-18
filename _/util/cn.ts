import { twMerge } from 'tailwind-merge';

export function mergeClasses(...inputs: string[]) {
  return twMerge(inputs);
}
