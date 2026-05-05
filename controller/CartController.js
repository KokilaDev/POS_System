import { CartModel } from "../model/CartModel.js";
import { CustomerModel } from "../model/CustomerModel.js";
import { ItemModel } from "../model/ItemModel.js";
import { customer_db, item_db, order_db } from "../db/DB.js";
import OrderDTO from "../dto/OrderDTO.js";
import { loadItemTable } from "./ItemController.js";

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

    $('#cash').on("input", function () {
        const cash = parseFloat($(this).val()) || 0;
        const total = CartModel.calculateTotal();

        if (cash < total) {
            $('#balance').text("0.00");
            $(this).addClass('error-border');
        } else {
            $('#balance').text((cash - total).toFixed(2));
            $(this).removeClass('error-border');
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

    $('#place_order_btn').on("click", function () {
       const cash = parseFloat($('#cash').val());
       const total = CartModel.calculateTotal();

       if (isNaN(cash) || cash < total) {
           Swal.fire({
               toast: true,
               position: 'top-end',
               icon: 'warning',
               title: 'Insufficient cash!',
               showConfirmButton: false,
               timer: 1500
           });
           return;
       }

       const balance = cash - total;
       $('#balance').text(balance.toFixed(2));

       const customerId = $('#selectCustomer').val();

       if (!customerId) {
           Swal.fire({
               toast: true,
               position: 'top-end',
               icon: 'warning',
               title: 'Please select customer!',
               showConfirmButton: false,
               timer: 1500
           });
           return;
       }

       const orderId = $('#orderId').text();
       const orderDate = $('#orderDate').text();
       const customer = customer_db.find(c => c._customer_id === customerId);

       const newOrder = new OrderDTO(orderId, customer._customer_name, orderDate, total);
       order_db.push(newOrder);

       CartModel.getAllItems().forEach(cartItem => {
           const item = item_db.find(i => i._item_code === cartItem._item_code);
           if (item) {
               item._qty_on_hand -= cartItem._qty;
               if (item._qty_on_hand < 0) {
                   item._qty_on_hand = 0;
               }
           }
       });

       loadItemTable();

       CartModel.clearCart();
       loadCartTable();
       calculateTotal();

       $('#cash').val("");
       $('#selectCustomer').val("");
       $('#balance').text("0.00");

       Swal.fire({
           toast: true,
           position: 'top-end',
           icon: 'success',
           title: 'Order placed successfully!',
           showConfirmButton: false,
           timer: 2000,
           timerProgressBar: true
       });

       $('#orderId').text(CartModel.generateOrderId());
       $('#orderDate').text(CartModel.updateOrderDate());
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

    const cash = parseFloat($('#cash').val()) || 0;
    const balance = cash - total;
    $('#balance').text(balance >= 0 ? balance.toFixed(2) : "0.00");
}

function clearItemFields() {
    $('#selectItem').val("");
    $('#price').val("");
    $('#qty').val("");
    $('#total').val("");
    $('#qtyOnHand').val("");
}