import { CustomerModel } from "../model/CustomerModel.js";

$(document).ready(function () {
    $('#customerId').text(CustomerModel.generateCustomerId());
});

$('#customer_save_btn').on('click', function () {
    saveCustomer();
})

function saveCustomer() {
    if(!validate()) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'warning',
            title: 'Please check your input fields!',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        });
        return;
    }

    let name = $('#customerName').val().trim();
    let address = $('#address').val().trim();
    let contact = $('#contact').val().trim();
    let email = $('#email').val().trim();

    if (!name || !address || !contact || !email) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'warning',
            title: 'Please fill all fields!',
            showConfirmButton: false,
            timer: 1500
        });
        return;
    }

    CustomerModel.addCustomer(name, address, contact, email);
    $(document).trigger("customer added");

    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Customer saved successfully!',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
    });
    $('#customerId').text(CustomerModel.generateCustomerId());
    clearFields();
}

function validate() {
    const rules = [
        { element: $('#customerName'), regex: patterns.name },
        { element: $('#address'), regex: patterns.address },
        { element: $('#contact'), regex: patterns.contact },
        { element: $('#email'), regex: patterns.email }
    ];
    return validateForm(rules);
}

function clearFields() {
    $('#customerName, #address, #contact, #email').val("");
}