$(document).ready(function(){
    var form = document.form;
    var inputs = [
        form.email,
        form.message,
        form.date
    ];
    var checkBoxes = [
        form.web,
        form.dekstopApp,
        form.teach
    ];

    var button = document.querySelector('button');

    button.addEventListener('click', function (event) {
        for (var i = 0; i < inputs.length; i++) {
            if (isEmpty(inputs[i])) {
                event.preventDefault();
                M.toast({
                    html: 'Please provide message details',
                    classes: 'rounded',
                });
                inputs[i].focus();
                break;
            } else if (checkBoxes[i].checked !== true) {
                event.preventDefault();
                M.toast({
                    html: 'Please select at least one service you require',
                    classes: 'rounded'
                });
                break;
            } else  {
                event.preventDefault();
                sendEmail();
            }
        } 
    }, false);

    $('.sidenav').sidenav();
    $('.materialboxed').materialbox();
    $('.parallax').parallax();
    $('.tabs').tabs();
    $('.datepicker').datepicker({
        disableWeekends: true
    });
    $('.tooltipped').tooltip();
    $('.scrollspy').scrollSpy();

    $('#top').on('click', function (event) {
        if (this.hash !== '') {
            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });
        }
    });

    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById('top').style.display = 'block';
        } else {
            document.getElementById('top').style.display = 'none';	
        }
    };

    function isEmpty (element) {
        if (element.value === '' || element.value.trim() === '') {
            return true;
        } else {
            return false;
        }
    }

    function sendEmail () {
        let data = {
            email: $('#email').val(),
            message: $('#message').val(),
            date: $('#date').val(),
            webDevelopment: $('#web').val(),
            desktopApp: $('#desktopApp').val(),
            teaching: $('#teach').val(),
        };
        const url = '/email';
        setTimeout(function () {
            $.ajax(url, {
                type: 'POST',
                data: data
            }).done (function () {
                M.toast({
                    html: 'Message Sent Successfully. Dominic will get back to you shortly.',
                    classes: 'rounded',
                });
                $('#email').val('');
                $('#message').val('');
                $('#date').val('');
                $('#web').checked(false);
                $('#desktopApp').checked('false');
                $('#teach').checked('false');
            }).fail(function (jqXHR, status) {
                M.toast({
                    html: 'Something went wrong. Message not sent. Please try again.',
                    classes: 'rounded'
                });
            });
        }, 1000);
    }
});


