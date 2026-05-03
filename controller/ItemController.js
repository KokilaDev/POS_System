import {ItemModel} from "../model/ItemModel.js";

$(document).ready(function () {
    $('#itemId').text(ItemModel.generateItemCode());
    loadItemTable();
});

function loadItemTable() {
    $('#item_tbody').empty();
    ItemModel.getAllItems().forEach((item, index) => {
        let row = `
            <tr data-index="${index}">
                <td>${item._item_code}</td>
                <td>${item._item_name}</td>
                <td>${item._unit_price}</td>
                <td>${item._qty_on_hand}</td>
                <td>${item._category}</td>
                <td>
                    <button class="btn btn-danger item_delete_btn">Delete</button>
                </td>
            </tr>`;
        $('#item_tbody').append(row);
    });

    $('#item_tbody tr').click(function () {
        let selectedCode = $(this).find('td:eq(0)').text();
        let selectedName = $(this).find('td:eq(1)').text();
        let selectedUnitPrice = $(this).find('td:eq(2)').text();
        let selectedQuantity = $(this).find('td:eq(3)').text();
        let selectedCategory = $(this).find('td:eq(4)').text();

        $('#itemId').text(selectedCode);
        $('#itemName').val(selectedName);
        $('#unitPrice').val(selectedUnitPrice);
        $('#quantity').val(selectedQuantity);
        $('#category').val(selectedCategory);

        clearValidation();
    });
}

$('#item_save_btn').on('click', function () {
    saveItem()
});

function saveItem() {
    let name = $('#itemName').val().trim();
    let unitPrice = $('#unitPrice').val().trim();
    let quantity = $('#quantity').val().trim();
    let category = $('#category').val().trim();

    if (!name || !unitPrice || !quantity || !category) {
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

    ItemModel.addItem(name, unitPrice, quantity, category);
    $(document).trigger("item added");

    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Item saved successfully!',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
    });
    loadItemTable();
    clearFields();
}

function clearFields() {
    $('#itemId').text(ItemModel.generateItemCode());
    $('#itemName, #unitPrice, #quantity, #category').val("");
}