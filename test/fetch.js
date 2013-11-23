
var test = require('tap').test;
var libetpan = require('../');
var IMAP = libetpan.mailimap;
var IMAPSet = libetpan.imapset;

test('fetch gmail', function (t) {

  var fetcher = new IMAP();
  var option = {
    hostname: 'imap.qq.com',
    port: 993,
    connectionType: libetpan.ConnectionSSL
  };

  fetcher.connect(option, function () {

    var range = new IMAPSet(0, 0);
    var define = [
      {type:libetpan.FetchTypeEnvelope},
      {type:libetpan.FetchTypeUID}
    ];
    var auth = {
      username: '550532246@qq.com',
      password: ''
    }
    fetcher.login(auth, _onlogin);
    function _onlogin () {
      fetcher.select('INBOX', function (error) {
        fetcher.fetch(range, define, {byuid:true}, function (error, messages) {
          t.equal(messages.length, 1, 'messages should only contain one element because latest.');
          console.log(messages);
          // Ctrl - C
        })
      })
    };

  })
})