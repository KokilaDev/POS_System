export default class CartDTO {
    constructor(item_code, qty_on_hand, unit_price, total) {
        this._item_code = item_code;
        this._qty_on_hand = qty_on_hand;
        this._unit_price = unit_price;
        this._total = total;
    }

    get item_code() {
        return this._item_code;
    }

    set item_code(value) {
        this._item_code = value;
    }

    get qty_on_hand() {
        return this._qty_on_hand;
    }

    set qty_on_hand(value) {
        this._qty_on_hand = value;
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