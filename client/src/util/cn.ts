import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';

export function mergeClasses(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addClass(element: HTMLElement, classes: string[]) {
  element.classList.add(...classes);
}
