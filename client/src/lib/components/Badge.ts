type Props = {};

class Badge {
  #props: Props;

  constructor(props: Props) {
    this.#props = Object.assign({}, props);
  }
}

export { Badge };
