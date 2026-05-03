import {ItemModel} from "../model/ItemModel.js";

$(document).ready(function () {
    $('#itemId').text(ItemModel.generateItemCode());
});

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
}