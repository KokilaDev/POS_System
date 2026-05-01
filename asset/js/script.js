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
});