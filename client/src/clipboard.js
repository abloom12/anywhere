class FormController {
  constructor(type, name, label) {
    this.type = type;
    this.name = name;
    this.label = label;
  }
}

class TextInput extends FormController {
  constructor(props) {
    super(props.type, props.name, props.label);
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
