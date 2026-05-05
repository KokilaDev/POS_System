import { CartModel } from "../model/CartModel.js";
import { CustomerModel } from "../model/CustomerModel.js";

$(document).ready(function () {
    $('#orderId').text(CartModel.generateOrderId());

    $('#orderDate').text(CartModel.updateOrderDate());

    loadCustomers();

    $(document).on("customerAdded customerUpdated customerDeleted", function () {
        loadCustomers();
    });
});

function loadCustomers() {
    const select = $('#selectCustomer');
    select.empty();
    select.append(`<option value="" disabled selected hidden>Select Customer</option>`);
    CustomerModel.getAllCustomers().forEach(customer => {
        select.append(`<option value="${customer._customer_id}">${customer._customer_name}</option>`);
    });
}