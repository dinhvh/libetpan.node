
var tls = require('tls');
var etpan = require('../').etpan;
var Constants = require('../').Constants;

var STATES = {
  'GREETING': 0,
  'RESPONSE': 1
};

var conn = tls.connect(993, 'imap.gmail.com');
var state = STATES.GREETING;
var logined = false;
var selected = false;
conn.on('data', function(chunk) {
  console.log(chunk+'');
  var r;
  if (state === STATES.GREETING) {
    r = etpan.responseParse(chunk, Constants.PARSER_ENABLE_GREETING);
  } else {
    r = etpan.responseParse(chunk, Constants.PARSER_ENABLE_RESPONSE);
  }

  if (r.result !== Constants.MAILIMAP_NO_ERROR && r.result !== Constants.MAILIMAP_ERROR_NEEDS_MORE_DATA) {
    throw new Error('parse error');
  }

  if (!logined) {
    conn.write('a1 login USERNAME PASSWORD\r\n');
    state = STATES.RESPONSE;
    logined = true;
    return;
  }

  if (!selected) {
    conn.write('a1 select inbox\r\n');
    selected = true;
    return;
  }

})