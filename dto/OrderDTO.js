export default class OrderDTO {
    constructor(order_id, customer_name, order_date, total) {
        this._order_id = order_id;
        this._customer_name = customer_name;
        this._order_date = order_date;
        this._total = total;
    }

    get order_id() {
        return this._order_id;
    }

    set order_id(value) {
        this._order_id = value;
    }

    get customer_name() {
        return this._customer_name;
    }

    set customer_name(value) {
        this._customer_name = value;
    }

    get order_date() {
        return this._order_date;
    }

    set order_date(value) {
        this._order_date = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }
}