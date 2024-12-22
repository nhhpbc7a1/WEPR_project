$(document).ready(function () {
    function initializeUserForm(userType) {
        $('#txtBirthday').datetimepicker({
            timepicker: false,
            format: 'd/m/Y',
            mask: true
        }).val(formatDate(new Date(userData.birth_date), 'MMMM DD, YYYY'));


        if (userType === "writer") {
            // Các xử lý cho writer
        }
        if (userType === "subscriber") {
            // Các xử lý cho subscriber
            $('#txtExpiration').datetimepicker({
                timepicker: true,
                format: 'd/m/Y h:i',
                mask: true
            }).val(formatDate(userData.subscription_expiration, 'DD/MM/YYYY hh:mm'));;
        }

        $('#frmUser').on('submit', function (e) {
            e.preventDefault();
            const username = $('#txtUsername').val();
            const email = $('#txtEmail').val();
            const password = $('#txtPassword').val();
            const passwordConfirm = $('#txtPasswordConfirm').val();
            const fullname = $('#txtName').val();
            const birth_date = $('#txtBirthday').val();
            const phone_number = $('#txtPhone').val();

            var oldUsername = $('#txtUsername').data('old-username');
            var oldEmail = $('#txtEmail').data('old-email');

            // Kiểm tra các trường không được để trống
            if (!username || !email || !password || !passwordConfirm || !fullname || !birth_date || !phone_number) {
                alert('Vui lòng điền đầy đủ thông tin.');
                return;
            }

            // Kiểm tra mật khẩu và xác nhận mật khẩu
            if (password !== passwordConfirm) {
                alert('Mật khẩu và xác nhận mật khẩu không khớp.');
                return;
            }

            // Kiểm tra username
            $.getJSON('/account/is-available?username=' + username, function (data) {
                if (data && username !== userData.username) {
                    alert('This username have been used for another account. Please try another email.');
                } else {
                    // Kiểm tra email
                    $.getJSON('/account/is-available-email?email=' + email, function (data) {
                        if (data && email !== userData.email) {
                            alert('This email have been used for another account. Please try another email.');
                        } else {
                            // Nếu không có lỗi, submit form
                            $('#frmUser').off('submit').submit();
                        }
                    });
                }
            });
        });
    }
    window.initializeUserForm = initializeUserForm;
});