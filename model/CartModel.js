import { order_db } from "../db/DB.js";

export const CartModel = {
    generateOrderId() {
        if (order_db.length === 0) return "O001";
        let lastId = order_db[order_db.length - 1].order_id;
        let num = parseInt(lastId.substring(1)) + 1;
        return "O" + String(num).padStart(3, "0");
    }
}