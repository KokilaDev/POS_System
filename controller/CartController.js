import { CartModel } from "../model/CartModel.js";

$(document).ready(function () {
    $('#orderId').text(CartModel.generateOrderId());
});