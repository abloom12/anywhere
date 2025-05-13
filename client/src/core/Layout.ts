export abstract class Layout {
  constructor() {}

  abstract render(): DocumentFragment;
}

export type LayoutConstructor = new () => Layout;

export interface LayoutModule {
  default: LayoutConstructor;
}
