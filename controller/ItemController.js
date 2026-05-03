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

$('#item_tbody').on('dblclick', 'td', function () {
   if ($(this).index() === 0) return;
   let value = $(this).text();
   $(this).html(`<input type="text" class="edit" value="${value}">`);
   $(this).find('input').focus();
});

$('#item_tbody').on('keypress', '.edit', function (e) {
    if (e.key === "Enter") {
        let input = $(this);
        let newValue = input.val();

        let cell = input.closest('td');
        let row = cell.closest('tr');

        let id = row.find('td:eq(0)').text();
        let colIndex = cell.index();

        ItemModel.updateItem(id, colIndex, newValue);
        input.parent().text(newValue);
    }
});

$('#item_tbody').on('click', '.item_delete_btn', function () {
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

            ItemModel.deleteItem(index);
            loadItemTable();

            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Item deleted successfully!',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            });
        }
    });
});

function clearFields() {
    $('#itemId').text(ItemModel.generateItemCode());
    $('#itemName, #unitPrice, #quantity, #category').val("");
}