let customer_db = [
    { _customer_id: "C001", _customer_name: "Kokila Dewmini", _address: "Matugama", _contact: "0713781427", _email: "kokila@gmail.com" },
    { _customer_id: "C002", _customer_name: "Adeepa Bimsara", _address: "Kalutara", _contact: "0719242615", _email: "adeepa@gmail.com" },
    { _customer_id: "C003", _customer_name: "Gayana Sathsarani", _address: "Agalawatta", _contact: "0702573037", _email: "gayana@gmail.com" },
    { _customer_id: "C004", _customer_name: "Dilani Fernando", _address: "Negombo", _contact: "0764567890", _email: "dilani@gmail.com" },
    { _customer_id: "C005", _customer_name: "Ruwan Jayasinghe", _address: "Kandy", _contact: "0783214569", _email: "ruwan@gmail.com" }
];

let item_db = [
    { _item_code: "I001", _item_name: "Rice 1kg", _unit_price: 250.00, _qty_on_hand: 100, _category: "Grains & Pulses" },
    { _item_code: "I002", _item_name: "Milk Packet", _unit_price: 120.00, _qty_on_hand: 3, _category: "Dairy & Eggs" },
    { _item_code: "I003", _item_name: "Coca Cola 1L", _unit_price: 300.00, _qty_on_hand: 4, _category: "Beverages" },
    { _item_code: "I004", _item_name: "Biscuits Pack", _unit_price: 180.00, _qty_on_hand: 75, _category: "Snacks & Confectionery" },
    { _item_code: "I005", _item_name: "Chili Powder 100g", _unit_price: 90.00, _qty_on_hand: 60, _category: "Spices & Seasonings" },
    { _item_code: "I006", _item_name: "Sugar 1kg", _unit_price: 280.00, _qty_on_hand: 45, _category: "Grains & Pulses" },
    { _item_code: "I007", _item_name: "Egg Tray (30)", _unit_price: 950.00, _qty_on_hand: 12, _category: "Dairy & Eggs" },
    { _item_code: "I008", _item_name: "Orange Juice 1L", _unit_price: 350.00, _qty_on_hand: 25, _category: "Beverages" },
    { _item_code: "I009", _item_name: "Soap Bar", _unit_price: 85.00, _qty_on_hand: 8, _category: "Household Essentials" },
    { _item_code: "I010", _item_name: "Cooking Oil 1L", _unit_price: 620.00, _qty_on_hand: 2, _category: "Household Essentials" }
];

let cart_db = [];
let order_db = [];

export { customer_db, item_db, cart_db, order_db }