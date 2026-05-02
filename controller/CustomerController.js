import { CustomerModel } from "../model/CustomerModel.js";

$(document).ready(function () {
    $('#customerId').text(CustomerModel.generateCustomerId());
    loadCustomerTable();
});

function loadCustomerTable() {
    let tablebody = $('#customer_tbody');

    tablebody.empty();
    CustomerModel.getAllCustomers().forEach((customer, index) => {
        let row = `
            <tr data-index="${index}">
                <td>${customer._customer_id}</td>
                <td>${customer._customer_name}</td>
                <td>${customer._contact}</td>
                <td>${customer._email}</td>
                <td>${customer._address}</td>
            </tr>`;
        tablebody.append(row);
    });

    $('#customer_tbody tr').click(function () {
        let selectedId = $(this).find('td:eq(0)').text();
        let selectedName = $(this).find('td:eq(1)').text();
        let selectedAddress = $(this).find('td:eq(2)').text();
        let selectedContact = $(this).find('td:eq(3)').text();
        let selectedEmail = $(this).find('td:eq(4)').text();

        $('#customerId').text(selectedId);
        $('#customerName').val(selectedName);
        $('#address').val(selectedAddress);
        $('#contact').val(selectedContact);
        $('#email').val(selectedEmail);

        clearValidation();
    });
}

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
    loadCustomerTable();
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
    $('#customerId').text(CustomerModel.generateCustomerId());
    $('#customerName, #address, #contact, #email').val("");
}