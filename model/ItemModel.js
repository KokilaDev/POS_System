import {item_db} from "../db/DB.js";
import ItemDTO from "../dto/ItemDTO.js";

export const ItemModel = {
    generateItemCode() {
        if (item_db.length === 0) return "I001";
        let lastId = item_db[item_db.length - 1].item_code;
        let num = parseInt(lastId.substring(1)) + 1;
        return "I" + String(num).padStart(3, "0");
    },

    addItem(name, unitPrice, quantity, category) {
        let id = this.generateItemCode();
        let item = new ItemDTO(id, name, unitPrice, quantity, category);
        item_db.push(item);
        return item;
    },

    updateItem(id, colIndex, value) {
        let item = item_db.find(i => i.item_code === id);
        if (!item) return;
        switch (colIndex) {
            case 1: item._item_name = value; break;
            case 2: item._unit_price = value; break;
            case 3: item._qty_on_hand = value; break;
            case 4: item._category = value; break;
        }
    },

    deleteItem(index) {
        item_db.splice(index, 1);
    },

    getAllItems() {
        return item_db;
    }
}