$(document).ready(function() {
    $('.gallery-item img').click(function() {
        $('#lightbox').fadeIn();
        $('#lightbox-img').attr('src', $(this).attr('src'));
    });

    $('.close').click(function() {
        $('#lightbox').fadeOut();
    });

    $('#lightbox').click(function(e) {
        if (e.target !== $('#lightbox-img')[0]) {
            $('#lightbox').fadeOut();
        }
    });
});
