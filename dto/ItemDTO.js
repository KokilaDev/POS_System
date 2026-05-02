export default class ItemDTO {
    constructor(item_code, item_name, unit_price, qty_on_hand, category) {
        this._item_code = item_code;
        this._item_name = item_name;
        this._unit_price = unit_price
        this._qty_on_hand = qty_on_hand;
        this._category = category;
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

    get unit_price() {
        return this._unit_price;
    }

    set unit_price(value) {
        this._unit_price = value;
    }

    get qty_on_hand() {
        return this._qty_on_hand;
    }

    set qty_on_hand(value) {
        this._qty_on_hand = value;
    }

    get category() {
        return this._category;
    }

    set category(value) {
        this._category = value;
    }
}