import { CartModel } from "../model/CartModel.js";
import { CustomerModel } from "../model/CustomerModel.js";
import { ItemModel } from "../model/ItemModel.js";
import { item_db } from "../db/DB.js";

$(document).ready(function () {
    $('#orderId').text(CartModel.generateOrderId());

    $('#orderDate').text(CartModel.updateOrderDate());

    loadCustomers();
    loadItems();

    $(document).on("customerAdded customerUpdated customerDeleted", function () {
        loadCustomers();
    });

    $(document).on("itemAdded itemUpdated itemDeleted", function () {
        loadItems();
    });

    $('#selectItem').on("change", function () {
        const selectedItemCode = $(this).val();
        const item = item_db.find(i => i._item_code === selectedItemCode);

        if (item) {
            $('#price').val(item._unit_price);
            $('#qtyOnHand').val(item._qty_on_hand);
        } else {
            $('#price').val("");
            $('#qtyOnHand').val("");
        }
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

function loadItems() {
    const select = $('#selectItem');
    select.empty();
    select.append(`<option value="" disabled selected hidden>Select Item</option>`);
    ItemModel.getAllItems().forEach(item => {
        select.append(`<option value="${item._item_code}">${item._item_name}</option>`);
    });
}