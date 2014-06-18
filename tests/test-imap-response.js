/*
 * libEtPan! -- a mail stuff library
 *
 * Copyright (C) 2001, 2014 - DINH Viet Hoa
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the libEtPan! project nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE AUTHORS AND CONTRIBUTORS ``AS IS'' AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHORS OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
 * OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 */

var fs = require('fs');
var path = require('path');
var test = require('tape');
var etpan = require('../lib/libetpan').etpan;
var Constants = require('../lib/libetpan').Constants;

test('SELECT response', function(t) {
  fs.readFile(path.join(__dirname, './responses/select'), function(err, res) {
    t.equal(err, null);
    var r = etpan.responseParse(res, Constants.PARSER_ENABLE_RESPONSE);
    var mailbox = r.getSelectResponseFromResponse();
    t.equal(r.result, Constants.MAILIMAP_NO_ERROR);
    t.equal(mailbox.exists, 172);
    t.end();
  });
});

test('EXAMINE response', function(t) {
  fs.readFile(path.join(__dirname, './responses/examine'), function(err, res) {
    t.equal(err, null);
    var r = etpan.responseParse(res, Constants.PARSER_ENABLE_RESPONSE);
    var mailbox = r.getSelectResponseFromResponse();
    t.equal(r.result, Constants.MAILIMAP_NO_ERROR);
    t.equal(mailbox.exists, 172);
    t.end();
  });
});

testCommon('CREATE');
testCommon('DELETE');
testCommon('RENAME');
testCommon('SUBSCRIBE');
testCommon('UNSUBSCRIBE');

test('LIST response', function(t) {
  var res = '* LIST (\\Noselect) "/" ~/Mail/foo\r\nA001 OK LIST\r\n';
  var r = etpan.responseParse(res, Constants.PARSER_ENABLE_RESPONSE);
  t.equal(r.result, Constants.MAILIMAP_NO_ERROR);
  t.end();
});

test('LSUB response', function(t) {
  var res = '* LSUB () "." #news.comp.mail.misc\r\nA001 OK LSUB\r\n';
  var r = etpan.responseParse(res, Constants.PARSER_ENABLE_RESPONSE);
  t.equal(r.result, Constants.MAILIMAP_NO_ERROR);
  t.end();
});

test('STATUS response', function(t) {
  var res = '* FLAGS (\\Answered \\Flagged \\Deleted \\Seen \\Draft)\r\nA001 OK FLAGS\r\n';
  var r = etpan.responseParse(res, Constants.PARSER_ENABLE_RESPONSE);
  t.equal(r.result, Constants.MAILIMAP_NO_ERROR);
  t.end();
});

// doesn't support the seesion of append
testCommon('APPEND');
testCommon('CHECK');
testCommon('CLOSE');

test('EXPUNGE response', function(t) {
  // TO BE IMPLEMENT MORE
  fs.readFile(path.join(__dirname, './responses/expunge'), function(err, res) {
    t.equal(err, null);
    var r = etpan.responseParse(res, Constants.PARSER_ENABLE_RESPONSE);
    t.equal(r.result, Constants.MAILIMAP_NO_ERROR);
    t.end();
  });
});

test('SEARCH response', function(t) {
  var res = '* SEARCH 2 3 6\r\nA001 OK SEARCH\r\n';
  var r = etpan.responseParse(res, Constants.PARSER_ENABLE_RESPONSE);
  t.equal(r.result, Constants.MAILIMAP_NO_ERROR);
  t.end();
});

test('FETCH response', function(t) {
  var res = '* 23 FETCH (FLAGS (\\Seen) RFC822.SIZE 44827)\r\nA001 OK FETCH\r\n';
  var r = etpan.responseParse(res, Constants.PARSER_ENABLE_RESPONSE);
  var items = r.getFetchItemsFromResponse();
  t.equal(r.result, Constants.MAILIMAP_NO_ERROR);
  t.equal(items[0].size, 44827);
  t.end();
});

testCommon('COPY');

test('STORE response', function(t) {
  // TO BE IMPLEMENT MORE
  fs.readFile(path.join(__dirname, './responses/store'), function(err, res) {
    t.equal(err, null);
    var r = etpan.responseParse(res, Constants.PARSER_ENABLE_RESPONSE);
    t.equal(r.result, Constants.MAILIMAP_NO_ERROR);
    t.end();
  });
});

function testCommon(command) {
  command = command.toUpperCase();
  test(command + ' response', function(t) {
    var res = 'A003 OK '+ command +' completed\r\n';
    var r = etpan.responseParse(res, Constants.PARSER_ENABLE_RESPONSE);
    t.equal(r.result, Constants.MAILIMAP_NO_ERROR);
    t.end();
  });
}
