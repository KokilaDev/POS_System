import { CustomerModel } from "../model/CustomerModel.js";

$(document).ready(function () {
    $('#customerId').text(CustomerModel.generateCustomerId());
});