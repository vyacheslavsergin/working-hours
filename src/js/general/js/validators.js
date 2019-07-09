export class Validators {
  required(el, value, nodes) {
    let isValid = true;
    let nameLength = true;
    let userNumberState = true;

    Object.keys(nodes)
      .forEach((n) => {
        nodes[n].nextElementSibling.innerHTML = '';
      });

    Object.keys(value)
      .forEach((v) => {
        if (value[v] === '') {
          this.getMessage(nodes[v], v);

          isValid = false;
        }

        if (v === 'name') {
          nameLength = this.validationName(value[v]);

          if (!nameLength) {
            this.getMessage(nodes[v], v);
            isValid = false;
          }
        }

        if (v === 'userNumber') {
          userNumberState = this.validationUserNumber(value[v]);

          if (!userNumberState) {
            this.getMessage(nodes[v], v);
            isValid = false;
          }
        }
      });

    return isValid;
  }

  validationName = (name) => {
    if (name.length > 255) {
      return false;
    }

    return true;
  }

  validationUserNumber = (number) => {
    if (number.length > 13) {
      return false;
    }

    return true;
  }

  getMessage = (node, value) => {
    let message = '';

    if (value === 'userNumber') {
      message = 'Введите тринадцать цифр';
    } else {
      message = 'Невалидные данные. Количество символово не должно превашать 255.';
    }

    node.nextElementSibling.innerHTML = message;
  }
}

const instance = new Validators();
export default instance;