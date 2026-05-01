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
    })
});