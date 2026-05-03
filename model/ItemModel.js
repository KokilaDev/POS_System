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
    }
}