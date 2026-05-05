import { cart_db, order_db } from "../db/DB.js";
import CartDTO from "../dto/CartDTO.js";

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
    },

    addToCart(item_code, item_name, qty, unit_price) {
        const total = qty * unit_price;

        let existingItem = cart_db.find(item => item._item_code === item_code);

        if (existingItem) {
            existingItem._qty += qty;
            existingItem._total = existingItem._qty * existingItem._unit_price;
        } else {
            const cartItem = new CartDTO(item_code, item_name, qty, unit_price, total);
            cart_db.push(cartItem);
        }
    },

    getAllItems() {
        return cart_db;
    },

    removeFromCart(item_code) {
        const index = cart_db.findIndex(item => item._item_code === item_code);
        if (index !== -1) {
            cart_db.splice(index, 1);
        }
    },

    calculateTotal() {
        return cart_db.reduce((sum, item) => sum + item._total, 0);
    }
}