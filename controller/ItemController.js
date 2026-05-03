import {ItemModel} from "../model/ItemModel.js";

$(document).ready(function () {
    $('#itemId').text(ItemModel.generateItemCode());
});