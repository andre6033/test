var s,
    DateWidget = {
        settings: {
            months: ['January','February ','March','April','May','June','Juli','August','September','October','November ','December'],
            day: new Date().getUTCDate(),
            currMonth: new Date().getUTCMonth(),
            currYear: new Date().getUTCFullYear(),
            yearOffset:41,
            containers: $(".dateDropdown")
        },

        init: function() {
            s = this.settings;
            DW = this;
            s.containers.each(function(){
                DW.removeFallback(this);
                DW.createSelects(this);
                DW.populateSelects(this);
                DW.initializeSelects(this);
                DW.bindUIActions();
            })
        },

        getDaysInMonth: function(month, year) {
            return new Date(year, month, 0).getDate();
        },

        addDays: function(daySelect, numDays){
            $(daySelect).empty();

            for(var i = 0; i < numDays; i++){
                $("<option />")
                    .text(i + 1)
                    .val(i + 1)
                    .appendTo(daySelect);
            }
        },

        addMonths: function(monthSelect){
            for(var i = 0; i < 12; i++){
                $("<option />")
                    .text(s.months[i])
                    .val(s.months[i])
                    .appendTo(monthSelect);
            }
        },

        addYears: function(yearSelect){
            for(var i = 0; i < s.yearOffset; i++){
                $("<option />")
                    .text( s.currYear - i)
                    .val( s.currYear - i)
                    .appendTo(yearSelect);
            }
        },

        removeFallback: function(container) {
            $(container).empty();
        },

        createSelects: function(container) {
            $("<select class='day select' name='day'>").appendTo(container);
            $("<select class='month select' name='month'>").appendTo(container);
            $("<select class='year select' name=' year'>").appendTo(container);
        },

        populateSelects: function(container) {
            DW.addDays($(container).find('.day'), DW.getDaysInMonth(s.currMonth, s.currYear));
            DW.addMonths($(container).find('.month'));
            DW.addYears($(container).find('.year'));
        },

        initializeSelects: function(container) {
            $(container).find('.day').val(s.day);
            $(container).find('.currMonth').val(s.month);
            $(container).find('.currYear').val(s.year);
        },

        bindUIActions: function() {
            $(".month").on("change", function(){
                var daySelect = $(this).prev(),
                    yearSelect = $(this).next(),
                    month = s.months.indexOf($(this).val()) + 1,
                    days = DW.getDaysInMonth(month, yearSelect.val());
                DW.addDays(daySelect, days);
            });

            $(".year").on("change", function(){
                var daySelect = $(this).prev().prev(),
                    monthSelect = $(this).prev(),
                    month = s.months.indexOf(monthSelect.val()) + 1,
                    days = DW.getDaysInMonth(month, $(this).val());
                DW.addDays(daySelect, days);
            });
        }
    };

DateWidget.init();
$(document).ready(function () {
    $.validator.addMethod("onlyLetters", function(value,element) {
        return (/^[А-Яа-яЁё\s]+$/).test(value)||(/^[a-zA-Z]+$/).test(value); /*только слова на латинице или на кирилице*/
    });
    $.validator.addMethod('confirmNum', function (value,element) {
        return (/[0-9]/).test(value)
    });
    $.validator.addMethod('confirmLet', function (value,element) {
        return (/[a-z]/).test(value)
    });
    $.validator.addMethod('confirmLetUp', function (value,element) {
        return (/[A-Z]/).test(value)
    });
    $.validator.addMethod('confMail', function (value,element) {
        return (/[.]/).test(value)
    });
    $('#reg_form').validate({
        rules: { /*здесь указываем атрибут name*/
            first_name: {
                required:true,
                onlyLetters:true
            },
            last_name: {
                required:true,
                onlyLetters:true
            },
            date_birth:{
                required:true
            },
            gender:{
                required:true
            },
            mail: {
                required: true,
                email:true,
                confMail:true
            },
            pass: {
                required: true,
                minlength: 8,
                confirmNum:true,
                confirmLet:true,
                confirmLetUp:true
            },
            pass_confirm: {
                required: true,
                equalTo: ".pass"
            }
        },
        messages: {
            first_name: {onlyLetters:'enter only the letters'},
            last_name: {onlyLetters:'enter only the letters'},
            pass:{confirmNum:'the password must contain numbers',confirmLet:'must contain lowercase letters',confirmLetUp:'must contain capital letters'},
            mail:{confMail:'Please enter a valid email address.'}
            /*тут можно указывать name, но если указать id ,то будет отслеживать minlenght при вводе без правила */
        },
        errorElement: 'div',/*По умолчанию сообщение с ошибкой выводится в сестринском элементе label. Чтобы изменить, например, label на div достаточно указать: errorElement: 'div'*/
        errorClass: "errorMessages",
        validClass: "success",
        highlight: function(element, errorClass, validClass) {
            $(element).addClass(errorClass).removeClass(validClass);
            $(element.form).find("label[for=" + element.id + "]")
                .addClass(errorClass);
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass(errorClass).addClass(validClass);
            $(element.form).find("label[for=" + element.id + "]")
                .removeClass(errorClass);
        },
        /*Чтобы регулировать поведение некорректных элементов, существуют две функции highlight (как выделять некорректны элемент) и unhighlight (ошибка ликвидирована, по умолчанию удалят error-класс). Обе функции принимают три аргумента: element, errorClass, validClass*/
        submitHandler: function() {
            var form_data = $('#reg_form').serialize();

            $.ajax({
                url: 'form_reg.php',
                type: "POST",
                data: form_data,
                success: function (e) {
                    alert('Регистрация прошла успешно');
                    reg_form.insertAdjacentHTML("afterend",e )
                    document.reg_form.reset(); /* сброс формы*/
                    subm.style.visibility = "hidden";
                },


                error: function () {
                    subm.classList.add('animated','shake');
                    subm.insertAdjacentHTML("afterend", '<div class="errorMessages" style="right: 0">Ошибка отправки формы</div>')
                }
            });
            return false;
        }
    });
});
window.onload = function () {
 const anim = document.querySelectorAll('.animated');
 let t =0;
 anim.forEach(function (key,i) {
     t += 0.25;
     key.classList.add('fadeInUp');
     key.setAttribute('style','animation-delay:'+t+'s')

 })
};
window.onload = function () {
    const logo = new Vivus('my-svg', { type: 'scenario-sync' });

// The property 'map' contain all the SVG mapping
    console.table(logo.map);
    new Vivus('my-svg',{type: 'async', duration: 150,animTimingFunction: Vivus.EASE_IN});
};