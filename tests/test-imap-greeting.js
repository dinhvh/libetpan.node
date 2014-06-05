
var test = require('tape');
var etpan = require('../lib/libetpan').etpan;
var Constants = require('../lib/libetpan').Constants;
var Capabilities = Constants.Capabilities;

test('empty response should throw error', function(t) {
  var emptyRes = '';
  var r = etpan.responseParse(emptyRes, Constants.ParsingOption.PARSER_ENABLE_GREETING);
  t.equal(r.result, Constants.Errno.MAILIMAP_ERROR_PARSE);
  t.end();
});

test('greeting response without crlf', function(t) {
  var greetingRes = '* OK [CAPABILITY IMAP4 IMAP4rev1 IDLE XAPPLEPUSHSERVICE ID UIDPLUS AUTH=LOGIN NAMESPACE] QQMail IMAP4Server ready';
  var r = etpan.responseParse(greetingRes, Constants.ParsingOption.PARSER_ENABLE_GREETING);
  // This should be returns MAILIMAP_ERROR_NEEDS_MORE_DATA(42)?
  t.equal(r.result, Constants.Errno.MAILIMAP_ERROR_PARSE);
  t.end();
});

test('greeting response', function(t) {
  var matches = [
    'Idle',
    'Id',
    'UIDPlus',
    'AuthLogin',
    'Namespace'
  ];
  var greetingRes = '* OK [CAPABILITY IMAP4 IMAP4rev1 IDLE XAPPLEPUSHSERVICE ID UIDPLUS AUTH=LOGIN NAMESPACE] QQMail IMAP4Server ready\r\n';
  var r = etpan.responseParse(greetingRes, Constants.ParsingOption.PARSER_ENABLE_GREETING);
  t.equal(r.result, etpan.MAILIMAP_NO_ERROR);
  r.getCapabilitiesFromResponse().forEach(function(item, index) {
    t.equal(Capabilities[item], matches[index]);
  });
  t.end();
});
