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

    updateCustomer(id, colIndex, value) {
        let customer = customer_db.find(c => c.customer_id === id);
        if (!customer) return;
        switch (colIndex) {
            case 1: customer._customer_name = value; break;
            case 2: customer._contact = value; break;
            case 3: customer._email = value; break;
            case 4: customer._address = value; break;
        }
    },

    deleteCustomer(index) {
        customer_db.splice(index, 1);
    },

    getAllCustomers() {
        return customer_db;
    }
}