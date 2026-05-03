import { CustomerModel } from "../model/CustomerModel.js";

$(document).ready(function () {
    $('#customerId').text(CustomerModel.generateCustomerId());
    loadCustomerTable();
});

$('.searchInput').on('keyup', function () {
    let value = $(this).val().toLowerCase();
    highlightRows('#customer_tbody', value);
});

function highlightRows(tbodySelector, searchValue) {
    $(`${tbodySelector} tr`).each(function () {
        let rowText = $(this).text().toLowerCase();

        if (rowText.includes(searchValue)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

function loadCustomerTable() {
    $('#customer_tbody').empty();
    CustomerModel.getAllCustomers().forEach((customer, index) => {
        let row = `
            <tr data-index="${index}">
                <td>${customer._customer_id}</td>
                <td>${customer._customer_name}</td>
                <td>${customer._contact}</td>
                <td>${customer._email}</td>
                <td>${customer._address}</td>
                <td>
                    <button class="btn btn-danger customer_delete_btn">Delete</button>
                </td>
            </tr>`;
        $('#customer_tbody').append(row);
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

$('#customer_tbody').on('dblclick', 'td', function () {
    if ($(this).index() === 0) return;
    let value = $(this).text();
    $(this).html(`<input type="text" class="edit" value="${value}">`);
    $(this).find('input').focus();
});

$('#customer_tbody').on('keypress', '.edit', function (e) {
    if (e.key === "Enter") {
        let input = $(this);
        let newValue = input.val();

        let cell = input.closest('td');
        let row = cell.closest('tr');

        let id = row.find('td:eq(0)').text();
        let colIndex = cell.index();

        CustomerModel.updateCustomer(id, colIndex, newValue);

        input.parent().text(newValue);
    }
});

$('#customer_tbody').on('click', '.customer_delete_btn', function () {
    let row = $(this).closest('tr');
    let index = row.data('index');

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        focusCancel: true,
        buttonsStyling: true,
        customClass: {
            confirmButton: 'btn btn-danger',
            cancelButton: 'btn btn-primary'
        }
    }).then((result) => {
        if (result.isConfirmed) {

            CustomerModel.deleteCustomer(index);
            loadCustomerTable();

            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Customer deleted successfully!',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            });
        }
    });
});

$('#customer_save_btn').on('click', function () {
    saveCustomer();
});

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