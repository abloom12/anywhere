class FormController {
  constructor(props) {
    this.type = props.type;
    this.name = props.name;
    this.label = props.label;
  }
}

class TextInput extends FormController {
  constructor(props) {
    super(props);
  }
}

class FormField {
  constructor(props) {
    this.props = props;
    this.control = null;
    this.label = null;
    this.message = null;
  }

  build() {
    switch (this.props.type) {
      case 'text': {
        this.control = new TextInput(this.props);
        break;
      }
    }

    this.label = document.createElement('label');
    this.message = document.createElement('p');
  }
}

const a = new FormField({
  type: 'input',
  name: 'inputName',
  label: 'inputLabelText',
});
