export default class CartDTO {
    constructor(item_code, item_name, qty, unit_price, total) {
        this._item_code = item_code;
        this._item_name = item_name;
        this._qty = qty;
        this._unit_price = unit_price;
        this._total = total;
    }

    get item_code() {
        return this._item_code;
    }

    set item_code(value) {
        this._item_code = value;
    }

    get item_name() {
        return this._item_name;
    }

    set item_name(value) {
        this._item_name = value;
    }

    get qty() {
        return this._qty;
    }

    set qty(value) {
        this._qty = value;
    }

    get unit_price() {
        return this._unit_price;
    }

    set unit_price(value) {
        this._unit_price = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }
}