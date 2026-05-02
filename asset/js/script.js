$(document).ready(function () {
    console.log("JS loaded");

    var swiper = new Swiper(".swiper", {
        loop: true,
        speed: 600,
        grabCursor: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        }
    });

    $('.login-form').on('submit', function (event) {
        event.preventDefault();

        const username = $('#username').val().trim();
        const password = $('#password').val().trim();

        if (username === "kokila" && password === "1234") {
            $('.login').hide();
            $('#pos-section').show();
            console.log("Login!")
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid credentials',
            });
        }

        $('#username').val("");
        $('#password').val("");
    })

    $('#logout_btn').on('click', function () {
        $('.login').show();
        $('#pos-section').hide();
        console.log('Logged out!');
    });
});

const tabs = {
    dashboard: '#dashboard_content',
    customer: '#customer_content',
    item: '#item_content',
    cart: '#cart_content',
    order: '#order_content'
};

$('.tab-content').hide();
$('#dashboard_content').show();

$('#dashboard_tab').on('click', function () { showTab('dashboard'); });
$('#customer_tab').on('click', function () { showTab('customer'); });
$('#item_tab').on('click', function () { showTab('item'); });
$('#cart_tab').on('click', function () { showTab('cart'); });
$('#order_tab').on('click', function () { showTab('order'); });

function showTab(tabName) {
    $('.tab-content').hide();
    $(tabs[tabName]).show();

    $('.sidebar-nav-item').removeClass('active');
    $(`#${tabName}_tab`).addClass('active');
}