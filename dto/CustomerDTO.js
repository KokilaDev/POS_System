export default class CustomerDTO {
    constructor(customer_id, customer_name, address, contact, email) {
        this._customer_id = customer_id;
        this._customer_name = customer_name;
        this._address = address;
        this._contact = contact;
        this._email = email;
    }

    get customer_id() {
        return this._customer_id;
    }

    set customer_id(value) {
        this._customer_id = value;
    }

    get customer_name() {
        return this._customer_name;
    }

    set customer_name(value) {
        this._customer_name = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }

    get contact() {
        return this._contact;
    }

    set contact(value) {
        this._contact = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }
}