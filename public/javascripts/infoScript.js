function reverseString(str) {
    var reverseStr = str.split("").reverse().join();
    var splitStr = reverseStr.replace(/[^\d1-9]/g, '').replace(/(.{3})/g, '$1 ').trim();
    return splitStr.split("").reverse().join().replace(/,/g, '');
}
var tomo = 0;
$('#donor tr').each(function () {
    var amount = Number(($(this).find('td:nth-child(4)').text()).replace(/\s+/g, ''));
    tomo += amount;
})
$('#tomo span, #cur_money').html(reverseString(tomo.toString()));
var all_money = Number($('#price').text().replace(/\s+/g, '')) * Number($('#portion').text());
$('#all_money').html(reverseString(all_money.toString()));
var rowCount = $('#myTable tr').length;
$('#num_donor').html(rowCount);

function getDaysBetweenDates(d0, d1) {

    var msPerDay = 8.64e7;

    // Copy dates so don't mess them up
    var x0 = new Date(d0);
    var x1 = new Date(d1);

    // Set to noon - avoid DST errors
    x0.setHours(12, 0, 0);
    x1.setHours(12, 0, 0);

    // Round to remove daylight saving errors
    return Math.round((x1 - x0) / msPerDay);
}
var ddl = $('#ddl').text();
var today = new Date();
console.log(ddl);
var day_left = getDaysBetweenDates(today, ddl);
if (day_left < 1) {
    $('#don').prop('disabled', true);
}
$('#day_left').html(day_left);
$('#progress_don').css({ 'width': tomo / all_money * 100 + '%' })

var one = Number($('#one').text());
var two = Number($('#two').text());
var three = Number($('#three').text());
var four = Number($('#four').text());
var five = Number($('#five').text());
var total = one + two + three + four + five;
var avg = one / total + 2 * two / total + 3 * three / total + 4 * four / total + 5 * five / total;
$(document).ready(function () {
    $('#total').html(total);
    $('.rating-num').html(avg.toFixed(1));
    $('.bar span').hide();
    $('#bar-five').animate({
        width: five / total * 100 + '%'
    }, 1000);
    $('#bar-four').animate({
        width: four / total * 100 + '%'
    }, 1000);
    $('#bar-three').animate({
        width: three / total * 100 + '%'
    }, 1000);
    $('#bar-two').animate({
        width: two / total * 100 + '%'
    }, 1000);
    $('#bar-one').animate({
        width: (one / total * 100) + '%'
    }, 1000);

    setTimeout(function () {
        $('.bar span').fadeIn('slow');
    }, 1000);

});
for (var i = 0; i < Math.round(avg); i++) {
    console.log(i);
    $('#star-' + (i + 1)).addClass('active');
}
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Get the forms we want to add validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();
$(".nav .nav-link").on("click", function () {
    $(".nav").find(".active").removeClass("active");
    $(this).addClass("active");
});

$.event.special.widthChanged = {
    remove: function () {
        $(this).children('iframe.width-changed').remove();
    },
    add: function () {
        var elm = $(this);
        var iframe = elm.children('iframe.width-changed');
        if (!iframe.length) {
            iframe = $('<iframe/>').addClass('width-changed').prependTo(this);
        }
        var oldWidth = elm.width();

        function elmResized() {
            var width = elm.width();
            if (oldWidth != width) {
                elm.trigger('widthChanged', [width, oldWidth]);
                oldWidth = width;
            }
        }

        var timer = 0;
        var ielm = iframe[0];
        (ielm.contentWindow || ielm).onresize = function () {
            clearTimeout(timer);
            timer = setTimeout(elmResized, 20);
        };
    }
}


function scrollFunction(list, preBtn) {
    // console.log(list.scrollTop);
    if (list.scrollTop > 10) {
        // console.log("true")
        document.getElementById(preBtn).style.display = "block";
    } else {
        document.getElementById(preBtn).style.display = "none";
    }
}
var listmenu = document.getElementById('list');
listmenu.onscroll = function () { scrollFunction(listmenu, "preBtn") };

document.getElementById('preBtn').addEventListener("click", function () {
    listmenu.scrollTop -= 100;
});
document.getElementById('nextBtn').addEventListener("click", function () {
    listmenu.scrollTop += 100;
});
$('.horizontal-scroll-wrapper').css({ "maxHeight": $('#myDiv').width() });

$('#myDiv').on('widthChanged', function () {
    // console.log($(this).width());
    $('.horizontal-scroll-wrapper').css({ "maxHeight": $(this).width() });
    // console.log($('.horizontal-scroll-wrapper').height());
});
$(document).ready(function () {
    $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});