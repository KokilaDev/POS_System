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

    $('#qty').on("input", function () {
        const qty = parseInt($(this).val()) || 0;
        const price = parseFloat($('#price').val()) || 0;
        const qtyOnHand = parseInt($('#qtyOnHand').val()) || 0;

        $('#total').val((qty * price).toFixed(2));

        if (qty > qtyOnHand) {
            $(this).addClass('error-border');
            $('#qtyError').text('Not enough stock!');
        } else {
            $(this).removeClass('error-border');
            $('#qtyError').text('');
        }
    });

    $('#add_to_cart_btn').on("click", function (event) {
        event.preventDefault();

        const item_code = $('#selectItem').val();
        const item_name = $('#selectItem option:selected').text();
        const qty = parseInt($('#qty').val());
        const price = parseFloat($('#price').val());

        if (!item_code || !item_name || isNaN(qty) || qty <= 0 || isNaN(price)) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'warning',
                title: 'Please select valid item & quantity!',
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

        const qtyOnHand = parseInt($('#qtyOnHand').val()) || 0;

        if (qty > qtyOnHand) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Not enough stock!',
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

        CartModel.addToCart(item_code, item_name, qty, price);

        loadCartTable();
        calculateTotal();
        clearItemFields();
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

function loadCartTable() {
    const tbody = $('#cart_tbody');
    tbody.empty();

    CartModel.getAllItems().forEach(item => {
        tbody.append(`
            <tr>
                <td>${item._item_name}</td>
                <td>${item._qty}</td>
                <td>${item._unit_price.toFixed(2)}</td>
                <td>${item._total.toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger remove-btn" data-id="${item._item_code}">
                        Remove
                    </button>
                </td>
            </tr>
        `);
    });

    $('.remove-btn').on("click", function () {
        const code = $(this).data("id");
        CartModel.removeFromCart(code);
        loadCartTable();
        calculateTotal();
    });
}

function calculateTotal() {
    const total = CartModel.calculateTotal();
    $('#total-amount').text(total.toFixed(2));
}

function clearItemFields() {
    $('#selectItem').val("");
    $('#price').val("");
    $('#qty').val("");
    $('#total').val("");
    $('#qtyOnHand').val("");
}