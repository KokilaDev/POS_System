import { customer_db } from "../db/DB.js";

export const CustomerModel = {
    generateCustomerId() {
        if (customer_db.length === 0) return "C001";
        let lastId = customer_db[customer_db.length - 1].id;
        let num = parseInt(lastId.substring(1)) + 1;
        return "C" + String(num).padStart(3, "0");
    }
}