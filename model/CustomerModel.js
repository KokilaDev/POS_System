import { customer_db } from "../db/DB.js";
import CustomerDTO from "../dto/CustomerDTO.js";

export const CustomerModel = {
    generateCustomerId() {
        if (customer_db.length === 0) return "C001";
        let lastId = customer_db[customer_db.length - 1].customer_id;
        let num = parseInt(lastId.substring(1)) + 1;
        return "C" + String(num).padStart(3, "0");
    },

    addCustomer(name, address, contact, email) {
        let id = this.generateCustomerId();
        let customer = new CustomerDTO(id, name, address, contact, email);
        customer_db.push(customer);
        return customer;
    },

    getAllCustomers() {
        return customer_db;
    }
}