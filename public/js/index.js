'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

document.addEventListener('DOMContentLoaded', function () {
    $('.sidenav').sidenav();
    $('.materialboxed').materialbox();
    $('.scrollspy').scrollSpy();
    $('.pushpin').pushpin({
        top: $('.pushpin').offset().top
    });
    $('.materialboxed').materialbox();

    var form = document.form;
    var button = document.querySelector('#submitButton');

    var inputs = [form.username, form.email, form.message];

    var sidelinks = document.querySelectorAll('.sidelinks');

    sidelinks.forEach(function (sidelink) {
        sidelink.addEventListener('click', function () {
            setTimeout(function () {
                $('.sidenav').sidenav('close');
            }, 1000);
        });
    });

    button.addEventListener('click', submitForm, false);
    form.addEventListener('submit', submitForm, false);

    function submitForm() {
        var isOkay = false;
        for (var i = 0; i < inputs.length; i++) {
            if (isEmpty(inputs[i])) {
                M.toast({
                    html: 'Please provide message details to send.',
                    classes: 'rounded'
                });
                inputs[i].focus();
                break;
            } else {
                isOkay = true;
            }
        }

        if (isOkay === true) {
            sendEmail();
        }
    }

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

    window.onscroll = function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById('top').style.display = 'block';
        } else {
            document.getElementById('top').style.display = 'none';
        }
    };

    function isEmpty(element) {
        if (element.value === '' || element.value.trim() === '') {
            return true;
        } else {
            return false;
        }
    }

    function sendEmail() {
        $('#submitButton').html('SENDING MESSAGE . . .');
        var data = {
            name: $('#username').val(),
            email: $('#email').val(),
            message: $('#message').val()
        };

        var url = '/email';

        $.ajax(url, {
            type: 'POST',
            data: data
        }).done(function () {
            M.toast({
                html: 'Message Sent Successfully. Dominic will get back to you shortly.',
                classes: 'rounded'
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
    }

    window.addEventListener('offline', function (event) {
        M.toast({
            html: 'You are currently offline'
        });
    });

    window.addEventListener('online', function (event) {
        M.toast({
            html: 'You are back online'
        });
    });

    var TypeWriter = function () {
        function TypeWriter(txtElement, words) {
            var wait = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3000;

            _classCallCheck(this, TypeWriter);

            this.txtElement = txtElement;
            this.words = words;
            this.txt = '';
            this.wordIndex = 0;
            this.wait = parseInt(wait, 10);
            this.type();
            this.IsDeleting = false;
        }

        _createClass(TypeWriter, [{
            key: 'type',
            value: function type() {
                var _this = this;

                // Current Index of word
                var current = this.wordIndex % this.words.length;
                // Get full text of current words
                var fullTxt = this.words[current];

                // Check if thisIsDeleting
                if (this.isDeleting) {
                    // Remove char
                    this.txt = fullTxt.substring(0, this.txt.length - 1);
                } else {
                    // Add char
                    this.txt = fullTxt.substring(0, this.txt.length + 1);
                }

                // Insert txt into txtElement
                this.txtElement.innerHTML = '<span class="txt">' + this.txt + '</span>';

                var cursor = document.querySelector('.txt');

                // Initial Type Speed
                var typeSpeed = 100;

                if (this.isDeleting) {
                    typeSpeed /= 4;
                }

                // If word is complete
                if (!this.isDeleting && this.txt === fullTxt) {
                    // Make pause at end
                    typeSpeed = 4000;
                    // Set delete to true
                    this.isDeleting = true;
                } else if (this.isDeleting && this.txt === '') {
                    this.isDeleting = false;
                    // Move to the next words
                    this.wordIndex++;
                    // Pause before start typing
                    cursor.style.borderRight = 'none';
                    typeSpeed = 3000;
                }
                setTimeout(function () {
                    return _this.type();
                }, typeSpeed);
            }
        }]);

        return TypeWriter;
    }();

    // Init App


    function init() {
        var txtElement = document.querySelector('.txt-type');
        var words = JSON.parse(txtElement.getAttribute('data-words'));
        var wait = txtElement.getAttribute('data-wait');
        // Init TypeWriter
        new TypeWriter(txtElement, words, wait);
    }

    init();
});