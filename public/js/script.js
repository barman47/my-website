$(document).ready(function(){
    var form = document.form;
    var button = document.querySelector('button');
    
    var inputs = [
        form.email,
        form.message,
        form.date
    ];
    
    var checkBoxes = [
        form.web,
        form.desktopApp,
        form.sayHi
    ];

    button.addEventListener('click', submitForm, false);
    form.addEventListener('submit', submitForm, false);

    function submitForm () {
        var counter = 0;
        while (counter < 1) {
            for (var i = 0; i < inputs.length; i++) {
                if (isEmpty(inputs[i])) {
                    M.toast({
                        html: 'Please provide message details to send.',
                        classes: 'rounded'
                    });
                    inputs[i].focus();
                    counter = 1;
                    break;
                }  
            }
            
            if (checkBoxes[0].checked === false && checkBoxes[1].checked === false && checkBoxes[2].checked === false) {
                M.toast({
                    html: 'Please select at least one service you require.',
                    classes: 'rounded'
                });
                counter = 1;
                break;
            } else {
                if (counter === 1) {
                    break;
                } else {
                    sendEmail();
                    counter ++;
                }
                
            }

        }
    }

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
        $('#submitButton').html('SENDING MESSAGE . . .');
        let data = {
            email: $('#email').val(),
            message: $('#message').val(),
            date: $('#date').val(),
        };

        if (checkBoxes[0].checked === false) {
            checkBoxes[0].value = ''
        } else {
            data.webDevelopment = $('#web').val();
        } 

        if (checkBoxes[1].checked === false) {
            checkBoxes[1].value = '';
        } else {
            data.desktopApp = $('#desktopApp').val();
        } 

        if (checkBoxes[2].checked === false) {
            checkBoxes[2].value === '';
        } else {    
            data.sayHi = $('#sayHi').val();
        }

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
                $('#submitButton').html('SEND MESSAGE');
                form.reset();
            }).fail(function (jqXHR, status) {
                M.toast({
                    html: 'Message not Sent. Please make sure you have an active internet connection.',
                    classes: 'rounded'
                });
                $('#submitButton').html('SEND MESSAGE');
            });
            
        }, 1000);
    }

    window.addEventListener('offline', function(event){
        M.toast({
            html: 'You are currently offline'
        });
    });

    window.addEventListener('online', function(event){
        M.toast({
            html: 'You are back online'
        });
    });
});

