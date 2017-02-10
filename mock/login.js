'use strict';

const qs = require('qs');

module.exports = {
  'GET /api/login': function (req, res) {
    const user = qs.parse(req.query);

    let data = {success: false, message: ''};

    if (user.username !== null && user.password !== null) {
      if (user.username === "hirohe" && user.password === "123456") {
        data.success = true;
        data.message = '登录成功';
      } else {
        data.message = '用户名或密码错误'
      }
    } else {
      data.message = '数据错误'
    }

    setTimeout(function () {
      res.json(data);
    }, 1000);
  },
};
