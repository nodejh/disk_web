(function($) {

  $('#register')
    .on('click', function() {
      var username = $('#username').val();
      if (!username) {
        return swal('username should not be empty', '', 'error');
      }
      var password = $('#password').val();
      if (!password) {
        return swal('password should not be empty', '', 'error');
      }
      var data = {
        username: username,
        password: password,
      };
      $.post('/register', data, function(res) {
        if (res.code === 0) {
          window.location.href = '/success?message=' + encodeURI('注册成功');
        } else {
          swal(res.message, '', 'error');
        }
      });
    });

})(jQuery);
