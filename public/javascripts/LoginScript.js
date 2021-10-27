function showPwd() {
    var p = document.getElementById('_password');
    p.setAttribute('type', 'text');
}

function hidePwd() {
    var p = document.getElementById('_password');
    p.setAttribute('type', 'password');
}
document.getElementById("eye").addEventListener("click", function() {
    if (this.checked) {
        showPwd();
    } else {
        hidePwd();
    }
});

function show(message) {
    var el = document.createElement("div");
    el.className = "snackbar";
    var y = document.getElementById("snackbar-container");

    el.innerHTML = message;
    y.append(el);
    el.className = "snackbar show";
    setTimeout(function() { el.remove(); }, 5000);
}
(function() {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
        .forEach(function(form) {
            form.addEventListener('submit', function(event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })
})()

function signin() {
    var userId = document.getElementById('_user_id').value;
    var password = document.getElementById('_password').value;
    $.ajax('/login', {
        type: 'POST',
        data: { userId: userId, password: password },
        success: function(data, status, xhr) {
            const person = {
                token: data.acessToken,
                id: data.id,
            }
            localStorage.setItem('BLOOM', JSON.stringify(person));
            window.location = '/';
        },
        error: function(jqXhr, textStatus, errorMessage) {
            show(errorMessage);
        }
    });
}
$(document).ready(function() {
    $(document).ajaxStart(function() {
        $("#loading").show();
    });
    $(document).ajaxStop(function() {
        $("#loading").hide();
    });
});

var ldld = new ldLoader({
    root: "#my-loader"
})

function verifier() {
    var donVal = document.getElementById('don-val').value;
    var password = document.getElementById('_password').value;
    var MoneyLeft = Number($('#MoneyLeft').text());
    console.log(MoneyLeft);
    var prj_name = $('h2').text().trim();
    let users = JSON.parse(localStorage.getItem('BLOOM'));
    var userId = users.id;
    var donateMoney = document.getElementById('don-val').value;
    if (donVal != '' && password != '') {
        if (donVal < 1000)
            show("Nhập giá trị ít nhất 1000VND");
        else if (donVal > MoneyLeft)
            show("Nhập giá trị không vượt qua số dư tài khoản");
        else {
            confirm('Bấm OK để xác nhận giao dịch');
            ldld.on();
            $.ajax({
                url: '/donate/' + prj_name,
                type: 'POST',
                data: { userId: userId, password: password, moneyDonate: donateMoney },
                success: function(data, status, xhr) {

                    const value = JSON.stringify(data);
                    const hash = JSON.parse(value).hash;
                    window.location = '/donate/success/' + prj_name + '/' + hash;

                },
                error: function(jqXhr, textStatus, errorMessage) {
                    show(errorMessage);
                }
            });
        }

    }
}