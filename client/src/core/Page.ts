export abstract class Page {
  protected prefetchAbortController = new AbortController();
  // cancel any in-flight fetch
  // this.abortCtrl.abort();

  constructor() {}

  abstract render(): DocumentFragment;
}

export type PageConstructor = new () => Page;

export interface PageModule {
  default: PageConstructor;
}
