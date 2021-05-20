class Errors {
    constructor() {
    }

    has(field) {
        return this.hasOwnProperty(field)
    }

    first(field) {
        if (this.has(field) && this[field].length > 0)
            return this[field][0]
    }

    all(field) {
        if (this.has(field) && this[field].length > 0)
            return this[field]
    }

    push(key, messages) {
        if (!this[key])
            this[key] = [];

        if (typeof messages === 'object') {
            if (messages.length)
                this[key] = [...this[key], ...messages]
        }
        else
            this[key].push(message);

        if (!this[key].length)
            this.clear(key)
    }

    clear(field) {
        delete (this[field]);
    }

    hasAny() {
        return Object.keys(this).length > 0;
    }
}


class Validator {

    validate(key, value, rules) {
        let errors = [];
        for (let rule of rules) {
            if (typeof this[rule] == "function")
                errors.push(this[rule](key, value, rule));

            else {
                const split = rule.split(':');
                if (split.length > 1 && typeof this[split[0]] == "function")
                    errors.push(this[split[0]](key, value, split.splice(1, 1)));

            }
        }

        return errors.filter(e => !!e);
    }

    numeric(key, value) {
        if (isNaN(value)) {
            return 'Please enter a valid number';
        }

        return null;
    }

    min(key, value, args) {
        const min = parseFloat(args[0]);
        if (value < min) {
            return 'Please enter a value equal to or greater than ' + min;
        }

        return null;
    }

    max(key, value, args) {
        const max = parseFloat(args[0]);
        if (value > max) {
            return 'Please enter a value equal to or less than ' + max;
        }
    }

    required(key, value) {
        if (value === undefined || value === null || value === '')
            return 'This field is required';
    }
}


export default class Form {
    constructor(inputs) {
        this.errors = new Errors();

        this._keys = Object.keys(inputs);
        for (let key of this._keys) {
            this[key] = inputs[key];
        }
    }

    clear(){
        for (let key of this._keys) {
            this[key].value = null;
        }
    }

    validate() {
        return new Promise((resolve, reject) => {
            this.errors = new Errors();
            const validator = new Validator();
            const keys = this._keys;

            for (let key of keys) {
                this.errors.push(key, validator.validate(key, this[key].value, this[key].rules.split('|')));
            }
            if (this.errors.hasAny())
                reject();

            resolve();
        });
    }
}
