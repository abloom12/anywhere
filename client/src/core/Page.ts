export abstract class Page {
  protected prefetchAbortController = new AbortController();
  // cancel any in-flight fetch
  // this.abortCtrl.abort();

  constructor() {}

  protected abstract render(): DocumentFragment;
}
