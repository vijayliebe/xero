'use strict';
var S = require('string');

module.exports = {

  dateToXeroDateTimeString: function(date) {
    var dates = {
      y: date.getUTCFullYear(),
      m: date.getUTCMonth() + 1,
      d: date.getUTCDate()
    };
    return S('DateTime({{y}}-{{m}}-{{d}})').template(dates);
  }

};
