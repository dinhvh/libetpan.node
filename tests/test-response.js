
var test = require('tape');
var etpan = require('../lib/libetpan').etpan;
var Constants = require('../lib/libetpan').Constants;

test('LIST response', function(t) {
  var res = '* LIST (\\Noselect) "/" ~/Mail/foo\r\nA001 OK LIST\r\n';
  var r = etpan.responseParse(res, Constants.ParsingOption.PARSER_ENABLE_RESPONSE);
  t.equal(r.result, Constants.Errno.MAILIMAP_NO_ERROR);
  t.end();
});

test('LSUB response', function(t) {
  var res = '* LSUB () "." #news.comp.mail.misc\r\nA001 OK LSUB\r\n';
  var r = etpan.responseParse(res, Constants.ParsingOption.PARSER_ENABLE_RESPONSE);
  t.equal(r.result, Constants.Errno.MAILIMAP_NO_ERROR);
  t.end();
});

test('STATUS response', function(t) {
  var res = '* FLAGS (\\Answered \\Flagged \\Deleted \\Seen \\Draft)\r\nA001 OK FLAGS\r\n';
  var r = etpan.responseParse(res, Constants.ParsingOption.PARSER_ENABLE_RESPONSE);
  t.equal(r.result, Constants.Errno.MAILIMAP_NO_ERROR);
  t.end();
});

test('SEARCH response', function(t) {
  var res = '* SEARCH 2 3 6\r\nA001 OK SEARCH\r\n';
  var r = etpan.responseParse(res, Constants.ParsingOption.PARSER_ENABLE_RESPONSE);
  t.equal(r.result, Constants.Errno.MAILIMAP_NO_ERROR);
  t.end();
});

test('FETCH response', function(t) {
  var res = '* 23 FETCH (FLAGS (\\Seen) RFC822.SIZE 44827)\r\nA001 OK FETCH\r\n';
  var r = etpan.responseParse(res, Constants.ParsingOption.PARSER_ENABLE_RESPONSE);
  var items = r.getFetchItemsFromResponse();
  t.equal(r.result, Constants.Errno.MAILIMAP_NO_ERROR);
  t.equal(items[0].size, 44827);
  t.end();
});
