import { order_db } from "../db/DB.js";

export const OrderModel = {
    getAllOrders() {
        return order_db;
    }
}