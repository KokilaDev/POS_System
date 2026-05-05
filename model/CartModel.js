import { order_db } from "../db/DB.js";

export const CartModel = {
    generateOrderId() {
        if (order_db.length === 0) return "O001";
        let lastId = order_db[order_db.length - 1].order_id;
        let num = parseInt(lastId.substring(1)) + 1;
        return "O" + String(num).padStart(3, "0");
    },

    updateOrderDate() {
        let today = new Date();

        let year = today.getFullYear();
        let month = String(today.getMonth() + 1).padStart(2, '0');
        let day = String(today.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
}